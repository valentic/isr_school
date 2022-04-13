#!/bin/sh

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT=isr_school_applications-$TIMESTAMP.csv

psql -f dump_applications.sql isr_school > $OUTPUT

echo $OUTPUT

