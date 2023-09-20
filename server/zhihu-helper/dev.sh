#!/bin/bash
echo -n "Enter openai apikey: "
read -s OPENAI_API_KEY
echo "Your openai api key is: $OPENAI_API_KEY"
OPENAI_API_KEY=$OPENAI_API_KEY npx next dev
