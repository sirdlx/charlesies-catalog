gsutil -m rm  gs://catalogbeta.dlxstudios.com/**/*

gsutil -m cp -r -z -a public-read dist/** gs://catalogbeta.dlxstudios.com

# gsutil -m acl set public-read gs://catalogbeta.dlxstudios.com/**/*
