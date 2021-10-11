const Handlebars = require('handlebars');
const { Utils } = require('./utils');
const commentListTemplate = require('../../views/partials/commentList.handlebars');

class App extends Utils {
    constructor() {
        super();
        this.sortButton = document.getElementById('sortButton');
        this.comments = [];
    }

    renderComments(data = [], error = null) {
        const resultsNode = document.getElementById('comments');
        const headerTitleNode = document.getElementById('headerTitle');
        const commentsTemplate = Handlebars.compile(commentListTemplate({ comments: data, error }));

        resultsNode.innerHTML = commentsTemplate({ comments: data, error });
        headerTitleNode.innerHTML = `${data.length} Comments`;
    }

    onLoadPage() {
        const onFailure = (error) => {
            this.renderComments([], error);
        }

        const onSuccess = (result) => {
            this.comments = result;
            this.renderComments(result);
            this.initSort();
        }

        this.fetchData()
            .then(onSuccess)
            .catch(onFailure);
    }

    initSort() {
        this.sortButton.addEventListener('click',  () => {
            this.sortButton.disabled = true;
            this.renderComments(this.sortData(this.comments))
        }, { once: true });
    }
}

new App().onLoadPage();
