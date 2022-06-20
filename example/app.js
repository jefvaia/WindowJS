function onload(){
    var meme = document.createElement("img");
    meme.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg";

    var window = new Window(0, 0, 200, 200, "Test1", document.body, meme);
    var window2 = new Window(500, 500, 200, 200, "Test2", document.body, meme);

    window.front();
}