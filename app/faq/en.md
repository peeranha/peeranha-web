# Frequently Asked Questions

## About Peeranha

### What is Peeranha?

Peeranha is a decentralized question and answer website that rewards users with crypto tokens (PEER) for their valuable contributions. Peeranha is built on a blockchain and it is owned by the community rather than by a single organization.

### How is Peeranha different from other questions and answers websites?

Unlike other question and answer websites where an organization owns the website and all the data generated from users, Peeranha is owned by the community and rewards are distributed to community members for their contributions and the attention they give to the website.

### How does it work?

Peeranha is built using smart contracts on the Telos blockchain. Large content is stored via distributed storage (IPFS) and only hashes of all documents are posted on the blockchain to save expensive blockchain storage. Reputation, privileges, moderation, rewards and all other rules are built into smart contracts and are visible to anyone.

### Where do tokens for rewards come from?

Peeranha continually creates new tokens once a week until the total supply of tokens is reached. For a currency, this is known as inflation. Every week, newly created tokens are transferred to the reward pool. This weekly reward pool is distributed proportionally to users’ contributions to the community during the week. As the website and community grow, additional sources begin to contribute tokens to the weekly reward pool. Such sources can be fees for the ads and job postings published on the website, donations, or other ways that the community decides to monetize the website. The rate of new token creation reduces every year and eventually decreases to zero. At this point, the weekly reward pool will solely consist of tokens monetized by the website.

### What Blockchain Peeranha is built on?

Peeranha is powered by TELOS blockchain. TELOS provides short confirmation times for transactions and does not require users to pay any transaction fees.

### What is the cryptocurrency of Peeranha?

Peeranha uses its own crypto-token (or cryptocurrency) called PEER.

### How can I earn crypto tokens on Peeranha?

All activities on the website that are considered valuable for the community are rewarded in crypto tokens. Contributions that earn tokens may include posting a detailed question, providing a helpful answer and participating in moderation.

### Where can I learn more?

The best ways to learn more about to join our twitter, read our blog or send us an email to hello@peeranha.io. You can also post your question in Peeranha community on the website.


## Account

### Are my keys safe if sign up with email? 

We believe that you should be the only one who has access to your private keys. Centralized servers are a single point of failure and a potential risk of mass hacks of user accounts.

Peeranha will transport and store your privates keys only in encrypted format. 

If create new account, then private keys are generated inside the application on your device. 

Two encrypted copies of your keys are sent to Peeranha API and saved in our database:
- The first copy is encrypted using your password and used when you normally use the account;
- The second copy is encrypted using your Master key and used to recover access to the account in case if you forget the password.

**It is very important to save Master Key in a safe place. We will not be able to restore access to your account if Master Key is lost.**

When access account, encrypted keys are sent to application and decrypted inside the application using your password or Master Key.

### Can I sign up with email if already have Telos account?

Yes, you can. You will need to provide at least active key for your account. However, we will never transport or store your key unencrypted. The key will be encrypted using your password and Master Key in the application and only after it is encrypted sent to our API.

### Can I delete my Peeranha account?

You will be able to delete your Peeranha wallet account (keys store) at any time if choose the option to sign up using email address. However, it is not possible to delete Telos account itself from the blockchain after it is created.

### What is Master Key?

Master Key is required to restore access to account if user forgets the password.

**It is very important to save Master Key in a safe place. We will not be able to restore access to your account if Master Key is lost.**

## Energy

### What is energy?

In order to prevent spam attacks and reduce system abuse, each user is given a certain amount of energy to intract with the system. The energy is re-charged automatically every 3 days.

Amount of energy depends on the user status:

| User Status | Energy |
| ----------- | ----------- |
| Stranger | 50 |
| Newbie | 100 |
| Junior | 150 |
| Resident | 200 |
| Senior | 250 |
| Hero | 300 |
| Superhero | 350 |


### How to charge energy?

Energy is re-charged automatically every 3 days.

### How much energy charged per action?

| Action | Energy |
| ----------- | ----------- |
|Downvote question|5|
|Downvote answer|3|
|Upvote question|1|
|Upvote answer|1|
|Post question|10|
|Post answer|6|
|Post comment|4|
|Modify question|2|
|Modify answer|2|
|Modify comment|1|
|Delete question|2|
|Delete answer|2|
|Delete comment|1|
|Mark answer as correct|1|
|Update profile|1|
|Suggest tag|75|
|Suggest community|125|
|Vote for community|1|
|Vote for tag|1|
|Follow community|1|
|Report inappropriate profile|5|
|Vote to delete question|3|
|Vote to delete answer|2|
|Vote to delete comment|1|

## Communities

### What is community?
Community is an area on the website dedicated to question and answers for a specific topic.

### How new communities and tags are created?

Communities and tags are created by community voting.
Peeranha team will be able to create communities without voting during the first year. Contact support if interested to create a community for your project.

## Questions, Answers and Comments

### How to ask questions?

1. Make sure that the question is relevant to the community where you ask it
1. Ask question that requires a solution or explanation, not an opinion
1. Provide as much detail as possible
1. Provide code examples if applicable


### How to format questions and answers?

Questions and answers can be formatted using HTML editor or markdown syntax.

Markdown cheat-sheet: https://www.markdownguide.org/cheat-sheet/

### How to tag question?

Select the tags that are most relevant to the question. At least one tag is required for each question.

### How questions, answers and comments are moderated?

Questions, answers and comments are moderated by the community through voting.

Peeranha team reserves few moderator users for duration of 1 year, that can delete questions, answers, comments without voting while the community is maturing.

### What are delete votes requirements for questions, answers and comments?

User impact in the voting depends on the status:

Question, answer or comment is delete after it receives enough voting points.

| Item | Required voting points |
| ----------- | ----------- |
|Question|150|
|Answer|125|
|Comment|50|

### Will I be notified if my question is deleted by moderation?

Notifications are not available in the first release. This functionality will be added in the future versions.


## Status, Rating and Previliges

### What user statuses are available on Peeranha?

| Status Name | Rating points |
| ----------- | ----------- |
|Stranger |0 ... 99|
|Newbie|100 ... 499|
|Junior|500-999|
|Resident|1000 ... 2499|
|Senior|2500 ... 4999|
|Hero|5000 ... 9999|
|Superhero|10000|

### How can I earn or lose rating points?

| Action or Event | Rating points |
| ----------- | ----------- |
|Answer accepted as correct|15|
|Upvote question|0|
|Downvote question|-1|
|Downvote answer|-1|
|Question upvoted|5|
|Answer upvoted|10|
|Question downvoted|-2|
|Answer downvoted|-2|
|Delete own question|-10|
|Delete own answer|-5|
|Delete own comment|0|
|Accept answer as correct|2|
|Question deleted by moderation|-15|
|Answer deleted by moderation|-10|
|Comment deleted by moderation|-5|
|Suggested tag created|75|
|Suggested tag deleted|-50|
|Suggested community created|200|
|Suggested community deleted|-150|

### What privileges are available to Peeranha users and what are rating requirements?

| Action or Event | Required rating |
| ----------- | ----------- |
|Post question| 0|
|Post answer| 0|
|Post comment under own question or answer|0|
|Post comment any under question or comment|35|
|Upvote question or answer|35|
|Downvote question or answer|100|
|Vote to delete|100|
|Suggest tag|500|
|Suggest community|2500|
|Vote for new tag|35|
|Vote for new community|100|
|Report inappropriate user profile|50|

### User voting impact

There are several types of voting on the website. User impact in the voting depends on the user status:
* Stranger (0 ... 99) - _impact - 0 points_
* Newbie (100 ... 499) - _impact - 1 points_
* Junior (500-999) - _impact -2 points_
* Resident (1000 ... 2499) - _impact - 3 points_
* Senior (2500 ... 4999) - _impact - 4 points_
* Hero (5000 ... 9999) - _impact - 5 points_
* Superhero (10000+) - _impact - 6 points_

Impact defines, how many points will be added for voting based on User status (Voting for adding/removing community, adding/removing tags, deleting questions, answers and comments)

## Token

### What is the name of Peeranha token?

Token name is PEER

### Is it listed on any exchange?

No, PEER is not listed on any exchange yet. We will notify the community as soon as this happens.

### What is total supply?

Total supply of PEER token is 100,000,000 PEER

### What is token allocation?

* 60% of PEER will be created by emission and used as initial rewards to users for the contributions
* 20% founders and team rewards
* 20% funding

### What is emission rate?

New tokens are created once per week when it is time to reward users. Maximum starting emission is 300,000 PEER per week. Emission is reduced by 10% every 52 weeks.

## Rewards

### When rewards are paid out?

Rewards are paid out weekly, starting from Peeranha launch date on December 17th, 2019.
To prevent abuse of the system, there a safety period of one additional week before rewards are available for users to be received. For example, estimated rewards for week 1 will be visible after beginning of week 2 but available to be received only after the beginning of week 3.

### How user rewards are calculated?

The maximum size of the weekly reward pool is equal to maximum weekly emission of the token. However, it depends on the user activity during that period.

If total rating points earned by all of the users during the week and multiplied by 10 is less than maximum token emission that reward is simply 10 PEER per rating point. Otherwise reward pool size is equal to maximum weekly token emission and tokens are distributed proportionally to rating points earned by users.



