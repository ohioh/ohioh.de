https://backlog.com/git-tutorial/branching/merge/
Good to know:
remote repository - this is the repository hosted by github on the server
initial repository  - your folder with the data

pull - (down)  pull the latest change from the remote repository to our local repository 
fetch - (down)
push - (up) to the repository that you point example: $ git push -u origin master ( or in our case develop)
Before you start check out how git works. If you know where you git head is at the moment you are ready to rock.


#####################################  How to update our forked repo with git rebase

Step 1: Add the remote (original repo that you forked) and call it “upstream”
Step 2: Fetch all branches of remote upstream.
Step 3: Rewrite your master with upstream's master using git rebase.
Step 4: Push your updates to master. You may need to force the push with “ --force ”

1.go to repository with your terminal
1.1 look woth $ git remote -v if origin and upstream is avaible.
1.1 if no origin avaible clone the ohioh repo to you folder
$git clone 
or $ git remote origin  https://github.com/ohioh/gaen-mobile.git
1.1.if no upstream avaible you have to add the pathcheck repository as upstream
$git remote -v remote add upstream https://github.com/Path-Check/gaen-mobile.git
1.1 now the upstream and our repo show be avaible with $git remote -V
2.
$ git fetch upstream
3.
$ git checkout master
Check out your fork's local master branch.
4.
$ git merge upstream/master
Merge the changes from upstream/master into your local master branch. This brings your fork's master branch into sync with the upstream repository, without losing your local changes.
If your local branch didn't have any unique commits, Git will instead perform a "fast-forward".

##################################### bring the OHIOH repo  branch up to date with your offline data

git commit -m "Centent"

git push

git push --set-upstream origin origin

##################################### hold your work a live while working on other branch


##################################### 3 Steps to Push to a remote repository 
1.Add 
$ git add myfile.txt


2.Commit
$ git commit -m "first commit"

3. Push 
$git push
#####################################  bring the main(master)mark to the newest version with merge

$ git checkout master
$ git merge issue1

##################################### delete a branch 
go to the main branch to check out the name like this:
$ git branch
delete:
$ git branch -d <branchname>

to create and go to the new repo
$ git branch -b <branchname>


##################################### see the last changes
$ git log


$it log --graph --oneline
##################################### Global config 
$git config
Set the username/email for a specific repository
git config user.name ohioh 
git config user.email github@ohioh.de


git config --get user.name git config --get user.email.

git config --global user.name ohioh 
git config --global user.email git@ohioh.de


#####################################
go to the master (develop) folder ... 
$ git merge <commit> 
The Called commit whc
