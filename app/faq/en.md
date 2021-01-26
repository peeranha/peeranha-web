# Frequently Asked Questions

## About Peeranha

### What is Peeranha?

Peeranha is a decentralized question and answer website that rewards users with crypto tokens (PEER) for their valuable contributions. Peeranha is built on a blockchain and it is owned by the community rather than by a single organization.

### How is Peeranha different from other question and answer websites?

Unlike other question and answer websites where an organization owns the website and all the data generated from users, Peeranha is owned by the community and rewards are distributed to community members for their contributions.

### How does it work?

Peeranha is built using smart contracts on the Telos blockchain. Large content is stored via distributed storage (IPFS) and only hashes of all documents are posted on the blockchain to save expensive blockchain storage. Reputation, privileges, moderation, rewards and all other rules are built into smart contracts and are visible to anyone.

### Where do tokens for rewards come from?

Peeranha continually creates new tokens once a week until the total supply of tokens is reached. For a currency, this is known as inflation. Every week, newly created tokens are transferred to the reward pool. This weekly reward pool is distributed proportionally across users who contributed to the community during the week.

### What Blockchain is Peeranha built on?

Peeranha is powered by Telos blockchain. Telos provides short confirmation times for transactions and does not require users to pay any transaction fees.

### What is the cryptocurrency of Peeranha?

Peeranha uses its own crypto-token (or cryptocurrency) called PEER.

### How can I earn crypto tokens on Peeranha?

All activities on the website that are considered valuable for the community are rewarded in PEER tokens. Contributions that earn tokens may include posting a detailed question, providing a helpful answer or acting as a moderator.

### Where can I learn more?

The best ways to learn more about us is to join our twitter, read our blog or send us an email to hello@peeranha.io. You can also post your questions on the Peeranha community on the website.

## Account

### Are my keys safe if I sign up with email?

We believe that you should be the only one who has access to your private keys. Centralized servers are a single point of failure and a potential risk of mass hacks of user accounts.

Peeranha will transport and store your privates keys only in encrypted format.

If you create a new account, then your private keys are generated inside the application on your device.

Two encrypted copies of your keys are sent to Peeranha’s API and saved in our database:

- The first copy is encrypted using your password and used when you normally use the account;
- The second copy is encrypted using your Master key and used to recover access to the account in case if you forget the password.

**It is very important to save your Master Key in a safe place. We will not be able to restore access to your account if your Master Key is lost.**

When accessing your account, encrypted keys are sent to the application and decrypted inside the application using your password or Master Key.

### Can I sign up with email if I already have a Telos account?

Yes you can. You will need to provide at least your active key for your account. However, we will never transport or store your key unencrypted. The key will be encrypted using your password and Master Key in the application and only after it is encrypted it is sent to our API.

### Can I delete my Peeranha account?

You will be able to delete your Peeranha wallet account (keys store) at any time if you choose the option to sign up using your email address. However, it is not possible to delete your Telos account from the blockchain after it is created.

### What is my Master Key?

Your Master Key is required to restore access to your account if you forget your password.

**It is very important to save Master Key in a safe place. We will not be able to restore access to your account if your Master Key is lost.**

### What is a temporary account?

Temporary account is a user profile that is created automatically on Peeranha, when a user asks or answers questions from Telegram messenger in case Telegram wasn’t linked to a Peeranha account before. This account displays the user's Telegram username on the website and works almost the same as a regular Peeranha account. User is not able to log in to this profile, perform any actions on Peeranha and receive any Tips from other users.

To link the temporary account with the account on Peeranha User should enter the following command in the private chat with a Peeranha bot in Telegram: /linkaccount. Then enter the Telos account name related to the main account, which can be found on the Profile page on Peeranha. After that, the link request must be confirmed on the Settings page on Peeranha.

After linking the accounts, all the gained rating points, questions, answers, and achievements will be added to the main profile. All the further questions and answers posted from the Telegram will be signed by the main profile name on Peeranha.

## Communities

### What is community?

Communities are an area on the website dedicated to question and answers for a specific topic.

### How are new communities and tags created?

Communities and tags are created by community voting. During the first year, the Peeranha team will be able to create communities without voting. Contact support at hello@peeranha.io if you’re interested in creating a community for your project.

## Questions, Answers and Comments

### What is a good question?

1.  Try to ask questions that are relevant to the community where you ask it
1.  Ask questions that requires a solution or explanation, not state an opinion
1.  Provide as much detail as possible
1.  Provide code examples, if applicable

### What are the differences between General and Expert Question?

#### Criteria:

General question:
A question not requiring expertise or experience to answer that can be one of the following:

- Subjective opinion exchange;
- Brainstorming;
- Feedback or review request;
- Answer is widely known.

Expert question:
A question that asks one of the following:

- A solution to a problem that requires expert knowledge or experience;
- Source of information or resources on a specific subject that is not easily found;
- Ask for instruction or recipe;
- Explanation or clarification of the information that is complicated to comprehend.

#### Rewards:

General question:
Rewards for Question Upvote is 1 point, Answer - 2 points.

Users can mark answer as the best to gain 1 extra point and reward an answerer with 3 points.

Expert question:
Reward for Question Upvote is 5 points, Answer - 10 points.

Users can mark answer as the best to gain 2 extra points and reward an answerer with 15 points.

#### Moderation:

If moderators decide that a wrong question type was chosen, they can change its type and the rewards will change according to the question type.

### How should I format questions and answers?

Questions and answers can be formatted using HTML editor or markdown syntax.

Markdown cheat-sheet can be found here: https://www.markdownguide.org/cheat-sheet/

### Do I have to tag my question?

Yes, at least one tag is required for each question. You should select the tags that are most relevant to the question.

### How are questions, answers and comments moderated?

Questions, answers and comments are moderated by the community through voting.

For the first year, the Peeranha team will act as moderators (can delete questions, answers, and comments without voting) but as the community matures, this function will be moved to other individuals in the community.

### How can questions, answers and comments be deleted?

Users must vote to delete a question, answer or comment.

A User’s weight in the voting depends on the user’s status.

### Will I be notified if my question is deleted?

Notifications are not available in the first release. This functionality will be added in the future versions.

## Status, Rating and Privileges

### What user statuses are available on Peeranha?

| Status Name | Rating points |
| ----------- | ------------- |
| Stranger    | 0 ... 99      |
| Newbie      | 100 ... 499   |
| Junior      | 500-999       |
| Resident    | 1000 ... 2499 |
| Senior      | 2500 ... 4999 |
| Hero        | 5000 ... 9999 |
| Superhero   | 10000         |

### How can I earn or lose rating points?

| Action or Event                               | Rating points |
| --------------------------------------------- | ------------- |
| Expert answer accepted as correct             | 15            |
| General answer accepted as correct            | 3             |
| Upvote question                               | 0             |
| Downvote question                             | -1            |
| Downvote answer                               | -1            |
| Expert question upvoted                       | 5             |
| General question upvoted                      | 1             |
| Expert answer upvoted                         | 10            |
| General answer upvoted                        | 2             |
| Expert question downvoted                     | -2            |
| General question downvoted                    | -1            |
| Expert answer downvoted                       | -2            |
| General answer downvoted                      | -1            |
| Delete own question                           | -1            |
| Delete own answer                             | -1            |
| Delete own comment                            | 0             |
| Accept answer as correct for Expert Question  | 2             |
| Accept answer as correct for General Question | 1             |
| Question deleted by moderation                | -2            |
| Answer deleted by moderation                  | -2            |
| Comment deleted by moderation                 | -1            |
| Suggested tag created                         | 75            |
| Suggested tag deleted                         | -50           |
| Suggested community created                   | 200           |
| Suggested community deleted                   | -150          |

### What privileges are available to Peeranha users and what are ratings requirements?

| Action or Event                                 | Required rating |
| ----------------------------------------------- | --------------- |
| Post question                                   | 0               |
| Post answer                                     | 0               |
| Post comment under one’s own question or answer | 0               |
| Post comment under question or comment          | 35              |
| Upvote a question or answer                     | 35              |
| Downvote a question or answer                   | 100             |
| Vote to delete a question, comment, or answer   | 100             |
| Suggest a tag                                   | 100             |
| Suggest a community                             | 500             |
| Vote for a new tag                              | 35              |
| Vote for a new community                        | 100             |

### What user achievements are available on Peeranha?

| Badge                 | Reason                               |
| --------------------- | ------------------------------------ |
| Question Asked        | Question is asked                    |
| Answer Given          | Answer is given                      |
| Correct Answer        | Correct answer is given              |
| Answered First        | Answer the question first            |
| Answer for 15 minutes | Answer is given within 15 minutes    |
| Founding Member       | Given to the first 10000 members     |
| Honorable Stranger    | Received rating is from 0 to 99      |
| Honorable Newbie      | Received rating is from 100 to 499   |
| Honorable Junior      | Received rating is from 500 to 999   |
| Honorable Resident    | Received rating is from 1000 to 2499 |
| Honorable Senior      | Received rating is from 2500 to 4999 |
| Honorable Hero        | Received rating is from 5000 to 9999 |
| Honorable Superhero   | Received rating is from 10000        |

## Token

### What is the name of token on Peeranha?

PEER

### Is PEER listed on any exchange?

No, PEER is not listed on any exchange yet. We will notify the community as soon as this happens.

### What is total supply?

The total supply of the PEER token is 100,000,000 PEER

### What is the token allocation?

- 60% of PEER will be created by emission and used as initial rewards to users for their contributions
- 20% for founders and team rewards
- 20% for funding

### What is emission rate?

New tokens are created once per week. The maximum starting emission is 100,000 PEER per week (depends on user activity). The emission is reduced by 10% every 52 weeks.

## Rewards

### When are rewards paid out?

Rewards are paid out weekly, starting from Peeranha’s launch date on December 16th, 2019.

To prevent abuse of the system, there is a safety period of one additional week before rewards are available for users.

For example:

- Week 1: users engage on site
- Week 2: rewards are allocated but not distributed
- Week 3: rewards from week 1’s contributions are distributed estimated rewards for week 1 will be visible after the start of week 2 but available to be received only after the start of week 3.

### How are user rewards calculated?

Exact user rewards depends on the user activity during a given period. The maximum size of the weekly reward pool is equal to maximum weekly emission of the token.

If total rating points earned by all of the users during the week multiplied by 10 is less than maximum token emission, then the reward is simply 10 PEERs per rating point.

Otherwise, the reward pool size is equal to the maximum weekly token emission and tokens are distributed proportionally to rating points earned by users.

## Messenger Bots

### Telegram

Telegram bot is created to give Users an ability to receive notifications about new questions, asked in their favorite communities in Telegram Messenger. Users are able to set notifications in private messages, groups or channels.

To set the bot for private messages search for @PeeranhaBot and start a chat with it.

To set it in group/channel click "Add members" and add @PeeranhaBot.

**Commands for bot:**

/subscribe - subscribes to the notifications from a community (e.g. /subscribe Peeranha)

/unsubscribe - unsubscribes from the notifications from a community (e.g. /unsubscribe Peeranha)

/communities - displays the communities that are available for subscription

/subscriptions - displays current subscriptions

**Commands for private chat:**

/postquestion - ask a question

/linkaccount - add telos account

/unlinkaccount - unlink telos account

/updatedisplayname - update display name

_Post an answer directly from Telegram by using "Reply" action on a notification message about a posted question._

_If you haven't linked you telegram account to Peeranha account yet, bot allows you to post question with temporary telegram account. Click here to learn more details https://testpeeranha.io/faq/#section_id_1_4_

## Boost

### What is a Boost?

Boost is a multiplier of the common PEER token reward that users are getting by increasing their rating points on Peeranha. The multiplier value depends on the User’s token investment amount called Stake. The highest Stake on Peeranha will give its owner the biggest Boost multiplier – X4. Other users, who made a lower Stake, compared to maximum stake, will get the calculated Boost multiplier according to their Stake.

### How to make a stake?

To make a stake, navigate to the Boost page from the wallet drop-down menu and fill the “Your Stake” form. Boost will be activated in the next period. Staked PEER tokens will be frozen and out of use until you unstake them.
The stake will always migrate from one period to another unless it is changed or withdrawn. Changes to the stake can be made anytime, but they will be applied in the next period.

### Why are my tokens frozen?

It's made to use these tokens as additional capital for the founding needs. This system works like bank deposits.

To unlock the tokens, withdraw the Stake and in the next period the staked tokens will be returned, and Boost will be deactivated.

### When I can get my reward?

The reward with Boost is paid out to users with the same rules as a common reward. Learn more about it in FAQ “Rewards” section

## Promoted Questions

### What is a Promoted question?

Promoted question is a good option to increase the probability of a question being noticed and answered on Peeranha. If the question is promoted, it will be pinned to the top of the questions list filtered by the related community on Peeranha, and in the related Single Community Mode.

### How to Promote a question?

To promote the question, fill the Promote question field on the Ask Question page for the new question or Edit Question page for an existing question. Enter how many hours the question will stay promoted. 1 hour of the promotion costs 2 PEER tokens.

### How is Promoted question displayed?

Promoted questions are displayed in the questions list filtered by the related community on Peeranha, and in the related Single Community Mode. Promoted questions are highlighted with special border color and marked with a 'Promoted' label.

If there are 3 or less Promoted questions in the Community then they are displayed on the top of the questions list in chronological order starting from the newest promoted question.

If there are more than 3 Promoted questions in the Community then 3 of them are chosen randomly and they are displayed on the top of the questions list in random order. The displayed questions and their order is changing every time after reloading or navigating to the Questions list page from other pages.

At the same time, the original copies of Promoted questions will also be displayed in the general list of Community's questions below the Promoted questions.

### Why can not I promote my question?

If an error message occurs when trying to Promote a question and the question is posted without the promotion, please try to enable pop-ups in the browser settings for this site. If it doesn't help, please contact our Support team, https://peeranha.io/support/#support_form
