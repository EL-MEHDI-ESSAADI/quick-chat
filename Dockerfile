FROM alpine:latest

ARG PB_VERSION=0.16.5

RUN apk add --no-cache \
    unzip \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Add pb_migrations folder from your app folder
COPY pb_migrations /pb/pb_migrations

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
