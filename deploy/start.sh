#!/bin/sh


if [ "$1" ]; then
  # Run the passed in command
  exec "$@"
else
  # If no command passed, get the port and run the server
  export MGEN_PORT=${MGEN_PORT:-3007}
  serve -n -p $MGEN_PORT .
fi

