import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const awsGetSecret = async () => {
  const secret_name = "GymIOS/GoogleApiKey";

  const client = new SecretsManagerClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  const secret = response.SecretString;
  return secret;
};

export default awsGetSecret;
