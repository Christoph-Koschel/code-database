"use strict";class TSBundler{constructor(){this.modules=new Map,this.loaded=new Map}define(e,t,r){this.modules.set(e,{modules:t,cb:r})}load(t){if(this.modules.has(t)){if(this.loaded.has(t))return this.loaded.get(t);let e=this.modules.get(t),r={};e.modules.forEach(e=>{let t=this.load(e);Object.keys(t).forEach(e=>{r[e]=t[e]})});var n={};return e.cb(n,r),this.loaded.set(t,n),n}throw"Cannot find module: "+t}}const bundler=new TSBundler;bundler.define("0",[],function(e,t){}),bundler.define("1",[],function(e,t){function n(e,t){return{not:()=>{return u(e,0,t)}}}function u(s,e,o){return{where:e=>{{var r=s,n=e,u=()=>!1;e=o;let t=[];for(let e=0;e<r.length;e++){var l=r[e];n(l,e)==u(l,e)&&t.push(l)}return{...i(e(t))}}},until:e=>{{var r=s,n=e,u=()=>!1;e=o;let t=[];for(let e=0;e<r.length;e++){var l=r[e];if(n(l,e)==u(l,e))break;t.push(l)}return i(e(t))}}}}function i(e){return{toList:()=>[e],get:()=>e}}e.select=function(e){return e=e.slice(),r=e,{first:()=>{var e=r,t=e=>e.shift();return{...n(e,t),...u(e,0,t),...i(e.shift())}},all:()=>{var e=r,t=e=>e;return{...n(e,t),...u(e,0,t),...i(e)}},last:()=>{var e=r,t=e=>e.pop();return{...n(e,t),...u(e,0,t),...i(e.pop())}}};var r}}),bundler.load("1");