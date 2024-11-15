#!/bin/bash

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not a git repository"
    exit 1
fi

# Get current date components for macOS date command
year=$(date "+%Y")
month=$(date "+%m")
day=15

# Calculate timestamps for start and end of day in seconds since epoch
start_timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$year-$month-$day 00:00:00" "+%s")
end_timestamp=$(date -j -f "%Y-%m-%d %H:%M:%S" "$year-$month-$day 23:59:59" "+%s")

# Get all commits from the current branch
commits=($(git log --format=%H))
num_commits=${#commits[@]}

if [ $num_commits -eq 0 ]; then
    echo "No commits found in the repository"
    exit 1
fi

# Calculate time interval between commits
time_interval=$(( (end_timestamp - start_timestamp) / (num_commits - 1) ))

# Create a temporary branch
temp_branch="temp-rewrite-$(date +%s)"
git checkout -b $temp_branch

echo "Spreading $num_commits commits across today's timeline..."

# Process each commit
for ((i=0; i<${#commits[@]}; i++)); do
    commit=${commits[i]}
    
    # Calculate new timestamp for this commit
    new_timestamp=$((start_timestamp + (i * time_interval)))
    # Convert timestamp to formatted date string for macOS
    new_date=$(date -j -f "%s" "$new_timestamp" "+%Y-%m-%d %H:%M:%S")
    
    # Get the commit message and author information
    commit_msg=$(git log -1 --format=%B $commit)
    author_name=$(git log -1 --format=%an $commit)
    author_email=$(git log -1 --format=%ae $commit)
    
    # Prepare the filter-branch command
    export GIT_COMMITTER_DATE="$new_date"
    export GIT_AUTHOR_DATE="$new_date"
    
    # Rewrite the commit
    git filter-branch -f --env-filter \
        "export GIT_AUTHOR_DATE=\"$new_date\"
         export GIT_COMMITTER_DATE=\"$new_date\"
         export GIT_AUTHOR_NAME=\"$author_name\"
         export GIT_AUTHOR_EMAIL=\"$author_email\"" \
        -- $commit^..$commit >/dev/null 2>&1
    
    echo "Processed commit $((i+1))/$num_commits - New timestamp: $new_date"
done

echo -e "\nCommits have been spread across today's timeline"
echo "You are now on branch: $temp_branch"
echo "To apply changes to your original branch:"
echo "1. Review the changes using 'git log'"
echo "2. If satisfied, force push using 'git push -f' (if this is a remote repository)"
echo "3. Or merge back to your original branch"
echo -e "\nWarning: This script rewrites git history. Use with caution on shared repositories."