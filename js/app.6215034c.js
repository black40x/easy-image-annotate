(function(e){function t(t){for(var s,i,r=t[0],l=t[1],c=t[2],d=0,f=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&f.push(a[i][0]),a[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(e[s]=l[s]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],s=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(s=!1)}s&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var s={},a={app:0},o=[];function i(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=s,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(n,s,function(t){return e[t]}.bind(null,s));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/easy-image-annotate/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0234":function(e,t,n){"use strict";n("1d91")},"10b0":function(e,t,n){},"1d91":function(e,t,n){},"28c7":function(e,t,n){},"3a61":function(e,t,n){e.exports=n.p+"img/ic_point.d2083054.svg"},"4e5b":function(e,t,n){e.exports=n.p+"img/ic_line.bcd22cad.svg"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var s=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("annotation-view"),n("tool-bar")],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"left-bar"},[n("div",{staticClass:"tabs"},[n("span",{class:{tabs__tab:!0,"tabs__tab--active":"files"===e.currentTab},on:{click:function(t){e.currentTab="files"}}},[e._v(" Files ")]),n("span",{class:{tabs__tab:!0,"tabs__tab--active":"classes"===e.currentTab},on:{click:function(t){e.currentTab="classes"}}},[e._v(" Classes ")]),n("span",{class:{tabs__tab:!0,"tabs__tab--active":"annotation"===e.currentTab},on:{click:function(t){e.currentTab="annotation"}}},[e._v(" Annotation ")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:"classes"===e.currentTab,expression:"currentTab === 'classes'"}],staticClass:"tab tab__classes"},[n("div",{staticClass:"tab-form"},[n("div",{staticClass:"tab-row"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newClassName,expression:"newClassName"}],staticClass:"editor-input",attrs:{type:"text",id:"new-class",placeholder:"New class name"},domProps:{value:e.newClassName},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleNewClass.apply(null,arguments)},input:function(t){t.target.composing||(e.newClassName=t.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newClassColor,expression:"newClassColor"}],staticClass:"editor-color",attrs:{type:"color"},domProps:{value:e.newClassColor},on:{input:function(t){t.target.composing||(e.newClassColor=t.target.value)}}})]),n("span",{staticClass:"tab-form__hint"},[e._v("Enter class name and press ENTER to create class.")])]),n("div",{staticClass:"items-list"},e._l(e.classes,(function(t,s){return n("list-item",{key:s,attrs:{name:t.name,color:t.color,active:e.activeClass===s},on:{click:function(t){return e.handleClassSelect(s)},dblclick:function(t){return e.handleClassRename(s)},remove:function(t){return e.handleClassRemove(s)}}})})),1),n("span",{staticClass:"proto-link",on:{click:e.handleClearClasses}},[e._v(" Clear classes ")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:"annotation"===e.currentTab,expression:"currentTab === 'annotation'"}],staticClass:"tab tab__annotation items-list"},e._l(e.currentAnnotations,(function(t,s){return n("list-item",{key:s,attrs:{name:t.class?t.class.name:"Undefined",color:t.class?t.class.color:"Undefined",active:e.selectedAnnotate===s},on:{click:function(t){return e.handleAnnotateSelect(s)},remove:function(t){return e.handleAnnotateRemove(s)}}})})),1),n("div",{directives:[{name:"show",rawName:"v-show",value:"files"===e.currentTab,expression:"currentTab === 'files'"}],staticClass:"tab tab__files items-list"},e._l(e.files,(function(t,s){return n("list-item",{key:s,attrs:{name:t.name,active:e.activeFile===s},on:{click:function(t){return e.handleFileSelect(s)},remove:function(t){return e.handleFileRemove(s)}}})})),1),n("button",{directives:[{name:"show",rawName:"v-show",value:e.files.length,expression:"files.length"}],staticClass:"download-json",on:{click:e.handleDownloadJson}},[e._v(" Download meta ")])])},r=[],l=n("5530"),c=(n("b0c0"),n("d81d"),n("d3b7"),n("159b"),n("c740"),n("e9c4"),n("2f62")),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"list-item":!0,"list-item--active":e.active},on:{click:e.handleClick,dblclick:e.handleDblClick}},[n("div",{staticClass:"list-item__inner"},[e.color?n("span",{staticClass:"list-item__color",style:{backgroundColor:e.color}}):e._e(),n("span",{staticClass:"list-item__name"},[e._v(e._s(e.name))]),n("span",{staticClass:"list-item__remove",on:{click:e.handleRemove}},[e._v("[X]")])])])},d=[],f={name:"FileItem",props:{name:String,color:String,active:Boolean},data:function(){return{isActive:!1}},mounted:function(){this.isActive=this.active},methods:{handleClick:function(){this.$emit("click")},handleDblClick:function(){this.$emit("dblclick")},handleRemove:function(e){e.stopPropagation(),this.$emit("remove")}}},h=f,m=(n("0234"),n("2877")),v=Object(m["a"])(h,u,d,!1,null,"f82a90f2",null),p=v.exports,g=n("7a09"),b=n("5bc3"),C=n("f403"),_=n("f822"),w={name:"ToolBar",components:{ListItem:p},computed:Object(l["a"])({},Object(c["b"])({classes:function(e){return e.classes},annotations:function(e){return e.annotations},files:function(e){return e.files},activeFile:function(e){return e.activeFile},activeClass:function(e){return e.activeClass},selectedAnnotate:function(e){return e.selectedAnnotate},currentAnnotations:function(e){return e.currentAnnotations}})),data:function(){return{currentTab:"classes",newClassName:"",newClassColor:""}},mounted:function(){this.newClassColor=this.randomColor()},methods:{randomColor:function(){for(var e="0123456789ABCDEF",t="#",n=0;n<6;n++)t+=e[Math.floor(16*Math.random())];return t},handleNewClass:function(){this.newClassName.length>0&&(this.$store.commit("addClass",{name:this.newClassName,color:this.newClassColor}),this.newClassName="",this.newClassColor=this.randomColor())},handleFileSelect:function(e){this.$store.commit("setActiveFile",e)},handleFileRemove:function(e){confirm("Remove this file?")&&this.$store.commit("removeFile",e)},handleClassRename:function(e){var t=prompt("Enter new class name:",this.classes[e].name);this.$store.commit("renameClass",{id:e,name:t})},handleClassSelect:function(e){this.$store.commit("setActiveClass",e)},handleClassRemove:function(e){confirm("Remove this class?")&&this.$store.commit("removeClass",e)},handleAnnotateSelect:function(e){this.$store.commit("selectAnnotation",e)},handleAnnotateRemove:function(e){confirm("Remove this annotation?")&&(this.$store.commit("removeAnnotation",e),this.$root.$emit("remove-feature",e))},handleClearClasses:function(){confirm("Remove all classes?")&&this.$store.dispatch("clearClasses")},handleDownloadJson:function(){var e=this,t=function(e,t){return[[e[0]/t.width,(t.height-e[1])/t.height],[e[2]/t.width,(t.height-e[3])/t.height]]},n=function(e){var n=e.getProperties().image,s=e.getGeometry(),a=s.getCoordinates();if(s instanceof g["a"])return{type:"Line",coordinates:a.map((function(e){return[e[0]/n.width,(n.height-e[1])/n.height]})),bbox:t(s.computeExtent(),n)};if(s instanceof b["b"])return{type:"Polygon",coordinates:a[0].map((function(e){return[e[0]/n.width,(n.height-e[1])/n.height]})),bbox:t(s.computeExtent(),n)};if(s instanceof C["a"])return{type:"Point",coordinates:[a[0]/n.width,(n.height-a[1])/n.height]};if(s instanceof _["a"]){var o=s.getCenter(),i=s.getRadius();return{type:"Circle",center:[o[0]/n.width,(n.height-o[1])/n.height],radius:i/n.width,bbox:t(s.computeExtent(),n)}}},s={classes:this.classes,files:[]};this.files.forEach((function(t,a){var o={file_name:t.name,annotations:e.annotations[a].map((function(t){var s=e.classes.findIndex((function(e){return e.name===t.getProperties().class.name}));return{class_id:s,geometry:n(t)}}))};s.files.push(o)}));var a=document.createElement("a"),o=JSON.stringify(s,null,4);a.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(o)),a.setAttribute("download",(new Date).toLocaleDateString("es-CL")+"_annotation.json"),a.style.display="none",document.body.appendChild(a),a.click(),document.body.removeChild(a)}}},y=w,A=(n("d4b4"),Object(m["a"])(y,i,r,!1,null,"6cf5eedc",null)),x=A.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"annotate",staticClass:"annotation"},[n("drag-and-drop-files",{ref:"fileSelector",on:{change:e.updateFiles,"drag-over":e.changeDragOver}}),n("annotation-editor",{directives:[{name:"show",rawName:"v-show",value:e.files.length>0&&null!==e.activeFile,expression:"files.length > 0 && activeFile !== null"}],ref:"editor"}),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.dragOver&&0===e.files.length,expression:"!dragOver && files.length === 0"}],staticClass:"annotation__empty"},[n("span",[e._v("🤖")]),n("br"),n("span",{staticClass:"sel-files",on:{click:e.selectImages}},[e._v("Select images...")]),e._v(" Or drop it here to annotate... ")])],1)},O=[],k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"drag-and-drop":!0,"drag-and-drop--hover":e.isHover},on:{dragover:e.dragover,dragleave:e.dragleave,drop:e.drop}},[n("input",{ref:"file",attrs:{type:"file",multiple:"",accept:".jpg,.jpeg,.png"},on:{change:e.onChange}}),n("span",[e._v("Drag PNG, JPG, JPEG here!..")])])},j=[],$=n("2909"),E=n("1da1"),T=(n("96cf"),n("a434"),{name:"DragAndDropFiles",data:function(){return{isDragOver:!1,count:0,filelist:[],watchEl:null}},computed:{isHover:function(){return this.isDragOver}},mounted:function(){this.watchEl=document,this.watchEl.addEventListener("dragover",this.dragover),this.watchEl.addEventListener("dragleave",this.dragleave),this.watchEl.addEventListener("drop",this.drop)},methods:{onChange:function(){var e=this;return Object(E["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.filelist=Object($["a"])(e.$refs.file.files),e.$emit("change",e.filelist);case 2:case"end":return t.stop()}}),t)})))()},remove:function(e){this.filelist.splice(e,1)},dragover:function(e){e.preventDefault(),this.isDragOver=!0,this.$emit("drag-over",!0)},dragleave:function(e){this.isDragOver=!1,this.$emit("drag-over",!1)},drop:function(e){e.preventDefault(),this.$refs.file.files=e.dataTransfer.files,this.onChange(),this.isDragOver=!1},select:function(){this.$refs.file.click()}},destroyed:function(){this.watchEl.removeEventListener("dragover",this.dragover),this.watchEl.removeEventListener("dragleave",this.dragleave),this.watchEl.removeEventListener("drop",this.drop)}}),S=T,P=(n("7e2b"),Object(m["a"])(S,k,j,!1,null,"65b8bdb0",null)),D=P.exports,N=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"annotation-editor"},[s("div",{directives:[{name:"show",rawName:"v-show",value:null!==e.currentClass,expression:"currentClass !== null"}],staticClass:"toolbar"},[s("button",{class:{toolbar__button:!0,"toolbar__button--active":"Circle"===e.currentTool},attrs:{title:"Annotate circle"},on:{click:function(t){return e.tool("Circle")}}},[s("img",{attrs:{src:n("833b")}})]),s("button",{staticClass:"toolbar__button",class:{toolbar__button:!0,"toolbar__button--active":"Box"===e.currentTool},attrs:{title:"Annotate box"},on:{click:function(t){return e.tool("Box")}}},[s("img",{attrs:{src:n("c5fe")}})]),s("button",{staticClass:"toolbar__button",class:{toolbar__button:!0,"toolbar__button--active":"LineString"===e.currentTool},attrs:{title:"Annotate line"},on:{click:function(t){return e.tool("LineString")}}},[s("img",{attrs:{src:n("4e5b")}})]),s("button",{staticClass:"toolbar__button",class:{toolbar__button:!0,"toolbar__button--active":"Polygon"===e.currentTool},attrs:{title:"Annotate polygon"},on:{click:function(t){return e.tool("Polygon")}}},[s("img",{attrs:{src:n("bf44")}})]),s("button",{staticClass:"toolbar__button",class:{toolbar__button:!0,"toolbar__button--active":"Point"===e.currentTool},attrs:{title:"Annotate point"},on:{click:function(t){return e.tool("Point")}}},[s("img",{attrs:{src:n("3a61")}})])]),e.classes.length>0&&null!==e.selectedAnnotate?s("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedAnnotateClass,expression:"selectedAnnotateClass"}],staticClass:"annotate-class",on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedAnnotateClass=t.target.multiple?n:n[0]},e.changeAnnotateClass]}},e._l(e.classes,(function(t,n){return s("option",{key:n,domProps:{value:n}},[e._v(" "+e._s(t.name)+" ")])})),0):e._e(),e.editor.ready?s("vl-map",{ref:"openlayer",staticClass:"ol-editor",style:{height:"100%",cursor:null!==e.currentTool?"crosshair":"pointer"},attrs:{"default-controls":!1},on:{mounted:e.onMapMounted}},[s("vl-view",{attrs:{projection:e.editor.projection.getCode(),center:e.editor.center,zoom:e.editor.zoom}}),s("vl-layer-image",{attrs:{id:"xkcd"}},[s("vl-source-image-static",{attrs:{size:e.editor.size,extent:e.editor.extent,projection:e.editor.projection.getCode(),url:e.editor.image.src}})],1),s("vl-layer-vector",{ref:"layer",attrs:{"z-index":2}},[s("vl-source-vector",{attrs:{features:e.features,ident:"the-source-edit"},on:{"update:features":function(t){e.features=t}}}),s("vl-style-func",{attrs:{factory:e.styleFuncFactoryEdit}})],1),null!==e.currentDraw&&null!==e.currentClass?s("vl-interaction-draw",{ref:"draw",attrs:{type:e.currentDraw,active:null!==e.currentDraw&&null!==e.currentClass,geometryFunction:e.geometryFunction,source:"the-source-edit"},on:{drawend:e.handleAnnotate}},[s("vl-style-func",{attrs:{factory:e.styleFuncFactoryDraw}})],1):e._e(),s("vl-interaction-modify",{attrs:{source:"the-source-edit"}})],1):e._e()],1)},R=[],I=(n("99af"),n("ac1f"),n("466d"),n("2986")),z=n("9a44"),L=n("ac29"),J={name:"AnnotationEditor",computed:Object(l["a"])(Object(l["a"])({},Object(c["b"])({files:function(e){return e.files},classes:function(e){return e.classes},activeClass:function(e){return e.activeClass},activeFile:function(e){return e.activeFile},annotations:function(e){return e.annotations},selectedAnnotate:function(e){return e.selectedAnnotate}})),{},{currentClass:function(){return null===this.activeClass?null:this.classes[this.activeClass]},currentDraw:function(){return"Box"===this.currentTool?"Circle":this.currentTool}}),watch:{features:function(){this.$refs.layer&&this.$store.commit("setAnnotations",{fileIndex:this.activeFile,features:this.$refs.layer.getSource().getFeatures(),save:!0})},activeFile:function(){var e=this;this.editor.ready=!1,this.editor.zoom=2,null!==this.activeFile&&this.$nextTick((function(){e.loadImageFile(e.files[e.activeFile]),e.features=e.annotations[e.activeFile]}))},selectedAnnotate:function(){if(null!==this.selectedAnnotate){var e=this.annotations[this.activeFile][this.selectedAnnotate];null!==e.properties&&(this.selectedAnnotateClass=this.classes.findIndex((function(t){return t.name===e.getProperties().class.name})))}this.$refs.layer.$layer.getSource().changed()}},data:function(){return{features:[],currentTool:null,geometryFunction:void 0,selectedAnnotateClass:null,editor:{ready:!1,center:[0,0],size:[0,0],zoom:2,extent:{},projection:null,image:null}}},mounted:function(){var e=this;this.$root.$on("remove-feature",(function(t){e.$refs.layer.getSource().removeFeature(e.$refs.layer.getSource().getFeatures()[t])}))},methods:{loadImageFile:function(e){var t=this;this.editor.image=new Image;var n=new FileReader;n.onload=function(){t.editor.image.src=n.result},this.editor.image.onload=function(){t.openEditor()},n.readAsDataURL(e)},openEditor:function(){this.editor.size=[this.editor.image.width,this.editor.image.height];var e=[0,0].concat(Object($["a"])(this.editor.size));this.editor.center=[this.editor.size[0]/2,this.editor.size[1]/2],this.editor.projection=Object(I["y"])({axisOrientation:"enu",code:"xkcd-image",units:"pixels",worldExtent:e,getPointResolution:function(e){return e},extent:e}),Object(I["r"])(this.editor.projection),this.editor.extent=e,this.editor.ready=!0},onMapMounted:function(){},tool:function(e){e===this.currentTool?this.currentTool=null:this.currentTool=e,"Box"===this.currentTool?this.geometryFunction=Object(L["a"])():this.geometryFunction=void 0},hexToRgb:function(e){var t=e.match(/[a-f0-9]{2}/gi);return t&&3===t.length?t.map((function(e){return parseInt(e,16)})):null},styleFuncFactoryDraw:function(){var e=this;return function(t){var n="#000000";return e.currentClass&&(n=e.currentClass.color),t.getProperties().class&&t.getProperties().class.color&&(n=t.getProperties().class.color),[Object(I["z"])({strokeColor:n,strokeWidth:1,imageColor:[255,255,255,.5],imageRadius:5,fillColor:[].concat(Object($["a"])(e.hexToRgb(n)),[.3])})]}},styleFuncFactoryEdit:function(){var e=this;return function(t){var n="#000000";e.currentClass&&(n=e.currentClass.color);var s=.8,a=.3;t.getProperties().class&&t.getProperties().class.color&&(n=t.getProperties().class.color,e.selectedAnnotate===t.getProperties().class.id&&(a=.5,s=2));var o=[Object(I["z"])({strokeColor:n,strokeWidth:s,imageColor:[255,255,255,.5],imageRadius:10,fillColor:[].concat(Object($["a"])(e.hexToRgb(n)),[a])}),Object(I["z"])({strokeColor:n,strokeWidth:1,imageColor:[255,255,255,.5],imageRadius:3,fillColor:n,geom:function(e){return e.getGeometry()instanceof C["a"]||e.getGeometry()instanceof _["a"]?null:e.getGeometry()instanceof g["a"]?new z["a"](e.getGeometry().getCoordinates()):e.getGeometry()instanceof b["b"]?new z["a"](e.getGeometry().getCoordinates()[0]):null}})];return o}},handleAnnotate:function(e){e.feature.set("class",Object(l["a"])(Object(l["a"])({},this.currentClass),{},{id:this.features.length-1})),e.feature.set("image",{width:this.editor.image.width,height:this.editor.image.height}),this.$store.commit("selectAnnotation",this.features.length-1),this.selectedAnnotateClass=this.activeClass},changeAnnotateClass:function(e){if(null!==this.selectedAnnotate){var t=this.classes[parseInt(this.selectedAnnotateClass)];this.annotations[this.activeFile][this.selectedAnnotate].getProperties().class.name=t.name,this.annotations[this.activeFile][this.selectedAnnotate].getProperties().class.color=t.color}this.$refs.layer.$layer.getSource().changed()}}},G=J,M=(n("9592"),Object(m["a"])(G,N,R,!1,null,"5c4c133a",null)),B=M.exports,U={name:"AnnotationView",components:{AnnotationEditor:B,DragAndDropFiles:D},computed:Object(l["a"])({},Object(c["b"])({files:function(e){return e.files},activeFile:function(e){return e.activeFile}})),data:function(){return{dragOver:!1}},methods:{updateFiles:function(e){this.dragOver=!1;for(var t=0;t<e.length;t++)this.$store.commit("addFile",e[t]);e.length>0&&null===this.activeFile&&this.$store.commit("setActiveFile",0)},selectImages:function(){this.$refs.fileSelector.select()},changeDragOver:function(e){this.dragOver=e}}},W=U,H=(n("e313"),Object(m["a"])(W,F,O,!1,null,"f4cea550",null)),V=H.exports,X={name:"App",components:{AnnotationView:V,ToolBar:x},mounted:function(){this.$store.dispatch("loadClasses")}},q=X,K=(n("5c0b"),Object(m["a"])(q,a,o,!1,null,null,null)),Q=K.exports,Y=n("1cf8");n("4de4"),n("7db0");s["a"].use(c["a"]);var Z=function(e){return e.filter((function(e){return null!==e.properties})).map((function(e,t){return{id:t,class:e.getProperties().class}}))},ee=new c["a"].Store({state:{files:[],classes:[],annotations:[],currentAnnotations:[],activeFile:null,activeClass:null,selectedAnnotate:null},actions:{loadClasses:function(e){var t=e.commit,n=localStorage.getItem("classes");n&&t("setClasses",JSON.parse(n))},clearClasses:function(e){var t=e.commit;localStorage.setItem("classes",[]),t("setClasses",[])}},mutations:{setActiveFile:function(e,t){e.currentAnnotations=Z(e.annotations[t]),e.selectedAnnotate=null,e.activeFile=t},setActiveClass:function(e,t){e.activeClass=t},setAnnotations:function(e,t){var n=t.fileIndex,s=t.features,a=t.save;e.annotations[n]=Object($["a"])(s),e.currentAnnotations=Z(s),!0!==a&&(e.selectedAnnotate=null)},selectAnnotation:function(e,t){e.selectedAnnotate=t},removeAnnotation:function(e,t){e.selectedAnnotate===t&&(e.selectedAnnotate=null)},addFile:function(e,t){e.files.push(t),e.annotations.push([])},removeFile:function(e,t){e.files.splice(t,1),e.annotations.splice(t,1),e.activeFile===t&&(e.activeFile=null)},setClasses:function(e,t){e.classes=t},addClass:function(e,t){void 0===e.classes.find((function(e){return e.name===t.name}))&&e.classes.push(t),localStorage.setItem("classes",JSON.stringify(e.classes))},removeClass:function(e,t){var n=e.classes[t];e.classes.splice(t,1),e.annotations.forEach((function(e){while(-1!==e.findIndex((function(e){return e.properties.class.name===n.name}))){var t=e.findIndex((function(e){return e.properties.class.name===n.name}));e.splice(t,1)}})),e.activeClass===t&&(e.activeClass=null),localStorage.setItem("classes",JSON.stringify(e.classes))},renameClass:function(e,t){e.currentAnnotations.forEach((function(n){n.class.name===e.classes[t.id].name&&(n.class.name=t.name)})),e.classes[t.id].name=t.name,localStorage.setItem("classes",JSON.stringify(e.classes))}}});s["a"].config.productionTip=!1,s["a"].use(Y["a"]),new s["a"]({store:ee,render:function(e){return e(Q)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"7bae":function(e,t,n){},"7e2b":function(e,t,n){"use strict";n("7bae")},"833b":function(e,t,n){e.exports=n.p+"img/ic_circle.e030fde3.svg"},9592:function(e,t,n){"use strict";n("c857")},"9c0c":function(e,t,n){},bf44:function(e,t,n){e.exports=n.p+"img/ic_polygon.b9d83758.svg"},c5fe:function(e,t,n){e.exports=n.p+"img/ic_box.259fd069.svg"},c857:function(e,t,n){},d4b4:function(e,t,n){"use strict";n("10b0")},e313:function(e,t,n){"use strict";n("28c7")}});
//# sourceMappingURL=app.6215034c.js.map