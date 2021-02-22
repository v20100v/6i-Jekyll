const build = require("../../_data/build.json");

let cssTitle = 'font-size:30px;color:#6f42c1;';
let cssSubtitle = 'font-style:italic;color:#6f42c1;';
let cssNormal = 'font-style:normal;';
let cssRedEye = 'color:#d9534f;';
let cssBlue = 'color:blue;';

let consologo = `
%c6i-Jekyll 
%cA Jekyll theme for IT blog & portfolio.
%chttps://github.com/v20100v/6i-Jekyll
%c
       .-""-.
      /[] _ _\\
     _│_%c●%c_LII│_
    / │ %c====%c │ \\
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾    
  Copyright © ` + new Date().getFullYear() + `,                                   
                                                      
  Version : ` + build.version + `                          
  Build   : ` + build.lastDateGeneration + `                       
  Env     : ` + build.environment + `
  Contact : vb20100bv@gmail.com
    
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾`;

console.log(
    consologo,
    cssTitle,
    cssSubtitle,
    cssSubtitle,
    cssNormal,
    cssRedEye,
    cssNormal,
    cssBlue,
    cssNormal
);

console.log('[6i-Jekyll] Rock\'n roll...');