#!/usr/bin/env bash
if [ $URL ]
then
    location=$(curl -sI https://en.wikipedia.org/wiki/Special:Random | awk -F': ' 'tolower($1) == "location" {print $2}' | tr -d '\r')
    content="Read https:$location"

    curl --header "Content-Type: application/json" \
    --request POST \
    --data "{\"content\":\"$content\"}" \
    "$URL"

fi