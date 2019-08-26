# Changelog

## 1.3
Changes to the role system:
* Removes the distinction between participant and lecturer on login
* Adds a user home where all related sessions are listed
* Adds a moderator role

Moderated comment board:
* Creators of sessions can add moderators (via room settings)
* Creators and moderators have access to the moderator board
* Two modes of moderating:
  * Default: new comments are auto-acknowledged and are visible on the normal comment board
  * Whitelist: new comments are only visible in the moderator board and need acknowledgement

Other Changes:
* Comments can now be marked as wrong
* Comments can get banned (to the moderator board, see above)
* User can delete his account
* Improve wording

**This version is brought to you by:**  
Project management: Klaus Quibeldey-Cirkel  
Lead programming: Tom "tekay" Käsler, Lukas Mauß  

## 1.2.1
Bug Fixes:
* Fix icons in room view for both roles

**This version is brought to you by:**  
Project management: Klaus Quibeldey-Cirkel  
Lead programming: Tom "tekay" Käsler, Lukas Mauß  

## 1.2
Features:  
* Adds a counter for the comments  
* Adds a badge in the comment view that counts comments / filtered comments  
* Adds a guest login for speaker role  

Performance improvements:  
* Enables Angular Ahead-of-Time compiler  
* Improves loading strategy for Service Workers  

General improvements:  
* Optimizes dark theme for better readability  
* Only shows the toolbar for the comments when there are more than 3 comments  
* Pins the searchbar for the comments to the top  
* Adds ID and local time to the header component in the comment view  
* Improves overall wording  

Bug Fixes:  
* Closes presentation view for comments on pressing ESC when in browser fullscreen  
* Fixed not being able to scoll in room settings  

**This version is brought to you by:**  
Project management: Klaus Quibeldey-Cirkel  
Lead programming: Tom "tekay" Käsler, Lukas Mauß  

## 1.1
Comment Feature:  
* Interaction via WebSockets  
* Voting on comments by participants  
* New attributes: read, favorite, correct  
* Search function  
* Sorting and filtering  
* Presentation mode with color indication for participants  
* Threshold to hide negative comments from participant and lecturer  

Improvements:  
* Add Progressive Web App functionality for a 'native app' feeling  
* Theme Manager with 4 Themes to chose from  
* Designimprovements  

**This version is brought to you by:**  
Project management: Klaus Quibeldey-Cirkel  
Lead programming: Tom "tekay" Käsler, Lukas Mauß  
