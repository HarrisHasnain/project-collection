terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}


locals {
  save_function_name    = "create_obituary_30139872"
  get_function_name     = "get_obituaries_30139872"

  save_handler_name     = "main.lambda_handler"
  get_handler_name      = "main.lambda_handler"

  save_artifact_name    = "save_artifact.zip"
  get_artifact_name     = "get_artifact.zip"
}

resource "aws_iam_role" "lambda" {
  name               = "iam-for-lambda-mems"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


data "archive_file" "save_lambda" {
  type = "zip"

  output_path = "save_artifact.zip"
  source_dir = "../functions/create-obituary/"
}

data "archive_file" "get_lambda" {
  type = "zip"

  output_path = "get_artifact.zip"
  source_dir = "../functions/get-obituaries/"
}


resource "aws_lambda_function" "save_lambda" {
  role              = aws_iam_role.lambda.arn
  function_name     = local.save_function_name
  handler           = local.save_handler_name
  filename          = local.save_artifact_name
  source_code_hash  = data.archive_file.save_lambda.output_base64sha256
  timeout           = 20

  runtime = "python3.9"
}

resource "aws_lambda_function" "get_lambda" {
  role              = aws_iam_role.lambda.arn
  function_name     = local.get_function_name
  handler           = local.get_handler_name
  filename          = local.get_artifact_name
  source_code_hash  = data.archive_file.get_lambda.output_base64sha256

  runtime = "python3.9"
}



resource "aws_iam_policy" "logs" {
  name        = "lambda-logging-mems"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "ssm:DescribeParameters",
        "ssm:GetParameters",
        "polly:SynthesizeSpeech"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.notes.arn}", "*", "arn:aws:ssm:ca-central-1:460734771065:parameter/*", "arn:aws:polly:*:*:lexicon/*"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.logs.arn
}


resource "aws_lambda_function_url" "save_url" {
  function_name = aws_lambda_function.save_lambda.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE"]
    allow_headers = ["*"]
    expose_headers = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "get_url" {
  function_name = aws_lambda_function.get_lambda.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE"]
    allow_headers = ["*"]
    expose_headers = ["keep-alive", "date"]
  }
}


output "save_lambda_url" {
  value = aws_lambda_function_url.save_url.function_url
}

output "get_lambda_url" {
  value = aws_lambda_function_url.get_url.function_url
}

resource "aws_dynamodb_table" "notes" {
  name = "mems_30139872"
  billing_mode = "PROVISIONED"


  read_capacity = 1

  
  write_capacity = 1


  hash_key = "name"


  attribute {
    name = "name"
    type = "S"
  }

}