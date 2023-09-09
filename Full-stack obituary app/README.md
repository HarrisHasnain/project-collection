Full-stack web application that creates obituaries (memorials) for any chosen character.

Program requires a name, picture and birth / death date, then returns a memorial card added to the home page with the others.

The memorial card contains the picture with a filter, the name, birth and death date of the character, and an ai generated memorial speech, with an audio play button at the bottom.

ReactJS is used for the front-end.

The back-end uses Terraform configuration, Amazon Web Service features such as the DynamoDB table to store obituaries to the cloud, and Python Lambda functions.
The cloudinary API is used to upload the picture to the cloud to save in the memorial card.
The openAI API is used to create the ai generated memorial speech.
Other AWS features are also used such as Secure String for password protection and Polly to generate the memorial speech audio.
