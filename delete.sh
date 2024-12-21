
#!/usr/bin/env bash

# ssh -i $HOME/.ssh/dbwebb owsu23@ssh.student.bth.se "rm -ri www/kundapp"

TARGET_DIR="kundapp"
ACCOUNT="owsu23"
echo "You are about to delete the following directory >>>https://www.student.bth.se/~$ACCOUNT/$TARGET_DIR<<<"
read -p "Are you REALLY REALLY sure you want to proceed? Type DELETE for yes: " confirm
echo ""

if [[ "$confirm" == "DELETE" ]]; then
    ssh -i "$HOME/.ssh/dbwebb" $ACCOUNT@ssh.student.bth.se "rm -ri www/$TARGET_DIR"
else
    echo "Operation canceled."
fi