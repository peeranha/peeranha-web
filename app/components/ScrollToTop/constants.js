/* 
*
* Add a regular expression for the path, where you want to show scroll to top button
*
*/

const regExp1 = /^\/$/;
const regExp2 = /^\/feed\/?$/;
const regExp3 = /^\/questions\/community\/\d+\/?$/;

export const scrollToTopRegExps = [regExp1, regExp2, regExp3];
