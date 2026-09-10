FROM devops:latest

COPY Tamar /devops
COPY Gali /devops

RUN Tamar breaks_it
RUN Gali blames_it

CMD ["works", "on", "my", "machine"]