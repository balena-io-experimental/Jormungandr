#!/bin/sh
node display.js &
echo "- event: updated" >> log.yml
echo "  time: `date -Ins`" >> log.yml
mkdir ~/.ssh/
echo "$private_key" > ~/.ssh/id_rsa
chmod 700 ~/.ssh/id_rsa
sed -i 's/\\n/\'$'\n/g' ~/.ssh/id_rsa
ssh -o StrictHostKeyChecking=no andrewl_autobot@git.resin.io
echo "- event: keyed" >> log.yml
echo "  time: `date -Ins`" >> log.yml
rm -rf ouroboros
git clone andrewl_autobot@git.resin.io:gh_sqweelygig/ouroboros.git --depth 1
echo "- event: cloned" >> log.yml
echo "  time: `date -Ins`" >> log.yml
cat log.yml > ouroboros/log.yml
cd ouroboros
git config user.email "$email"
git config user.name "$name"
echo "- event: changed" >> log.yml
echo "  time: `date -Ins`" >> log.yml
git commit -am "log entry"
git push origin
echo "- event: updated" >> log.yml
echo "  time: `date -Ins`" >> log.yml
sleep 300s
echo "- event: retried" >> log.yml
echo "  time: `date -Ins`" >> log.yml
