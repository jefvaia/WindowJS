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

    this.dragging = false;
    this.relativePos = {
        x: null,
        y: null
    };

    this.onload = function(){
        this.div = document.createElement("div");

        this.div.style.position = "absolute";

        this.div.style.border = "1px solid black";
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + 28 + "px";

        this.parent.appendChild(this.div);

        this.divDragBar = document.createElement("div");

        this.divDragBar.draggable = true;

        this.divDragBar.style.border = "1px solid black";
        this.divDragBar.style.padding = "2px";
        this.divDragBar.innerHTML = this.title;

        this.div.appendChild(this.divDragBar);

        this.divContentDiv = document.createElement("div");

        this.divContentDiv.style.border = "1px solid black";

        this.div.appendChild(this.divContentDiv);

        this.divContent = this.content.cloneNode(true);

        this.divContent.style.width = this.width - 2 + "px";
        this.divContent.style.height = this.height + "px";

        this.divContentDiv.appendChild(this.divContent);

        this.divDragBar.addEventListener("dragstart", this.dragStart.bind(this), false);
        this.parent.addEventListener("dragover", this.dragOver, false);
        this.parent.addEventListener("drop", this.drop.bind(this), false);

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

    this.front = function(others){
        var length = this.parent.children.length;

        this.div.style.zIndex = 9999999;

        for(var index = 0; index < length; index++){
            if(this.parent.children[index] != this.div){
                this.parent.children[index].style.zIndex = parseInt(this.parent.children[index].style.zIndex, 10) - 1;
            }
        }
    }

    this.onload();
}