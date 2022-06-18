function Window(x, y, width, height, title, parent, content){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.title = title;
    this.parent = parent;
    this.content = content;

    this.div = null;
    this.divDragBar = null;
    this.divContentDiv = null;
    this.divContent = null;
    this.divResizer = null;

    this.dragging = false;
    this.resizing = false;
    this.relativePos = {
        x: null,
        y: null
    };

    this.generate = function(){
        this.div = document.createElement("div");

        this.div.style.position = "absolute";

        this.div.style.border = "1px solid black";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + 2 + "px";
        this.div.style.height = this.height + 26 + "px";

        this.parent.appendChild(this.div);

        this.divDragBar = document.createElement("div");

        this.divDragBar.draggable = true;

        this.divDragBar.style.border = "1px solid black";
        this.divDragBar.style.padding = "2px";
        this.divDragBar.style.userSelect = "none";
        this.divDragBar.innerHTML = this.title;

        this.div.appendChild(this.divDragBar);

        this.divContentDiv = document.createElement("div");

        this.divContentDiv.style.border = "1px solid black";
        this.divContentDiv.style.height = this.height + "px";

        this.div.appendChild(this.divContentDiv);

        this.divContent = this.content.cloneNode(true);

        this.divContent.style.width = "100%";
        this.divContent.style.height = "100%";

        this.divContentDiv.appendChild(this.divContent);

        this.divResizer = document.createElement("div");

        this.divResizer.style.width = "10px";
        this.divResizer.style.height = "10px";
        this.divResizer.style.right = "0px";
        this.divResizer.style.bottom = "0px";
        this.divResizer.style.cursor = "se-resize";
        this.divResizer.style.position = "absolute";
        this.divResizer.style.background = "black";

        this.divContentDiv.appendChild(this.divResizer);

        this.divDragBar.addEventListener("dragstart", this.dragStart.bind(this), false);
        this.parent.addEventListener("dragover", this.dragOver, false);
        this.parent.addEventListener("drop", this.drop.bind(this), false);
        this.divResizer.addEventListener("mousedown", this.resizeStart.bind(this), false);
        this.divResizer.addEventListener("mousemove", this.resizeMove.bind(this), false);
        this.divResizer.addEventListener("mouseup", this.resizestop.bind(this), false);

        this.front();
    };

    this.dragStart = function(event){
        console.log("Start Dragging");

        this.dragging = true;

        var divBounds = this.div.getBoundingClientRect();

        this.relativePos.x = event.clientX - divBounds.left;
        this.relativePos.y = event.clientY - divBounds.top;
    };

    this.dragOver = function(event){
        console.log("Dragging");
        event.preventDefault(); 
        return false; 
    };

    this.drop = function(event){
        if(this.dragging){

            this.div.style.left = parseInt(event.clientX - this.relativePos.x, 10).toString() + "px";
            this.div.style.top = parseInt(event.clientY - this.relativePos.y, 10).toString() + "px";

            this.dragging = false;
        }

        event.preventDefault();
        return false;
    };

    this.resizeStart = function(event){
        console.log("Start Resizing");

        this.resizing = true;
    }

    this.resizeMove = function(event){
        if(this.resizing){
            console.log("Resizing");

            var contentWidth = (event.clientX - this.div.offsetLeft) + 5;
            var contentHeight = (event.clientY - this.div.offsetTop) + 5;

            if(contentWidth >= 1){
                this.div.style.width = contentWidth + "px";
                this.divContentDiv.style.width = contentWidth - 2 + "px";
            }
            if(contentHeight >= 1){
                this.div.style.height = contentHeight + "px";
                this.divContentDiv.style.height = contentHeight - 26 + "px";
            }

            console.log(contentHeight);
            
        }
    }

    this.resizestop = function(event){
        this.resizing = false;
    }

    this.front = function(others){
        var length = this.parent.children.length;

        this.div.style.zIndex = 9999999;

        for(var index = 0; index < length; index++){
            if(this.parent.children[index] != this.div){
                this.parent.children[index].style.zIndex = parseInt(this.parent.children[index].style.zIndex, 10) - 1;
            }
        }
    }

    this.generate();
}