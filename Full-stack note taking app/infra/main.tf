terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

# specify the provider region
provider "aws" {
  region = "ca-central-1"
}


locals {
  save_function_name    = "save_note_30139872"
  delete_function_name  = "delete_note_30139872"
  get_function_name     = "get_notes_30139872"

  save_handler_name     = "main.lambda_handler"
  delete_handler_name   = "main.lambda_handler"
  get_handler_name      = "main.lambda_handler"

  save_artifact_name    = "save_artifact.zip"
  delete_artifact_name  = "delete_artifact.zip"
  get_artifact_name     = "get_artifact.zip"
}

# create a role for the Lambda function to assume

resource "aws_iam_role" "lambda" {
  name               = "iam-for-lambda-notes"
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

# create archive file from main.py
data "archive_file" "save_lambda" {
  type = "zip"
  # this file (main.py) needs to exist in same folder as this
  # Terraform configuration file
  source_file = "../functions/save-note/main.py"
  output_path = "save_artifact.zip"
}

data "archive_file" "delete_lambda" {
  type = "zip"
  # this file (main.py) needs to exist in same folder as this
  # Terraform configuration file
  source_file = "../functions/delete-note/main.py"
  output_path = "delete_artifact.zip"
}

data "archive_file" "get_lambda" {
  type = "zip"
  # this file (main.py) needs to exist in same folder as this
  # Terraform configuration file
  source_file = "../functions/get-notes/main.py"
  output_path = "get_artifact.zip"
}

# create a Lambda function

resource "aws_lambda_function" "save_lambda" {
  role              = aws_iam_role.lambda.arn
  function_name     = local.save_function_name
  handler           = local.save_handler_name
  filename          = local.save_artifact_name
  source_code_hash  = data.archive_file.save_lambda.output_base64sha256

  
  runtime = "python3.9"
}

resource "aws_lambda_function" "delete_lambda" {
  role              = aws_iam_role.lambda.arn
  function_name     = local.delete_function_name
  handler           = local.delete_handler_name
  filename          = local.delete_artifact_name
  source_code_hash  = data.archive_file.delete_lambda.output_base64sha256


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
  name        = "lambda-logging-notes"
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
        "dynamodb:Query"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.notes.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

# attach the above policy to the function role

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.logs.arn
}

# create a function URL for Lambda

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

resource "aws_lambda_function_url" "delete_url" {
  function_name = aws_lambda_function.delete_lambda.function_name
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

# show the function URL after creation
output "save_lambda_url" {
  value = aws_lambda_function_url.save_url.function_url
}

output "delete_lambda_url" {
  value = aws_lambda_function_url.delete_url.function_url
}

output "get_lambda_url" {
  value = aws_lambda_function_url.get_url.function_url
}

resource "aws_dynamodb_table" "notes" {
  name = "notes_30139872"
  billing_mode = "PROVISIONED"

  # 8kb / s
  read_capacity = 1

  # 1kb / s
  write_capacity = 1

  # only need student id to find item
  # don't need sort key
  hash_key = "email"
  range_key = "id"

  # hash key data type is string
  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "id"
    type = "S"
  }
}
