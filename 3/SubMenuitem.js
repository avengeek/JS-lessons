class SubMenuItem extends Menu {
    constructor(id, className, href, title, items) {
        super(id, className, items);
        this.href = href;
        this.title = title;
    }
    render(){
    	return `<li><a href="${this.href}">` + this.title + '</a>' + `${super.render()}`;
    }
}