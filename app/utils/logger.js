import AWS from 'aws-sdk';
import { ApplicationError } from './errors';

const cloudwatchlogs = new AWS.CloudWatchLogs({
  accessKeyId: process.env.AWS_LOGGER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_LOGGER_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_LOGGER_REGION,
});

export function putLogEvent(message, stacktrace, token) {
  if (typeof message !== 'string') {
    throw new ApplicationError('Message has to be string');
  }

  if (process.env.NODE_ENV === 'development') {
    throw new ApplicationError('Env has not to dev.');
  }

  cloudwatchlogs.putLogEvents(
    {
      logEvents: [
        {
          message: JSON.stringify({
            message,
            stacktrace,
          }),
          timestamp: Date.now(),
        },
      ],
      logGroupName: process.env.AWS_LOGGER_GROUP_NAME,
      logStreamName: process.env.AWS_LOGGER_STREAM_NAME,
      sequenceToken: token,
    },
    err => {
      if (err && err.name === 'InvalidSequenceTokenException') {
        const validToken = err.message.match(/[0-9]+/gim);
        putLogEvent(message, stacktrace, String(validToken));
      }
    },
  );
}
