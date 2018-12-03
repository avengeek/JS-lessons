class Menu {
    constructor(id, className, items) {
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render(){
        let result = `<ul id="${this.id}" class="${this.className}">`;
        for (let i = 0; i < this.items.length; i++){
              result += this.items[i].render();
        }
        result += `</ul>`;
        return result
    }
    removeMenu(menuBlock){
        // document.getElementById.(`${this.id}`).remove();
        menuBlock.removeChild(document.getElementById(`${this.id}`));
    }
}