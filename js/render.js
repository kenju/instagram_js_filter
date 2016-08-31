/**
 * render.js
 */

var types = [
    'Original',
    'Lark',
    'Reyes',
    'Juno',
    'Slumber',
    'Crema',
    'Ludwig',
    'Aden',
    'Perpetua',
    'Amaro',
    'Mayfair',
    'Rise',
    'Hudson',
    'Valencia',
    'XProII',
    'Sierra',
    'Willow',
    'Lo-Fi',
    'Earlybird',
    'Brannan',
    'Inkwell',
    'Hefe',
    'Nashville',
    'Sutro',
    'Toaster',
    'Walden',
    '1977',
    'Kelvin',
    'Grayscale',
    'Sepia',
    'Luminance',
    'Brighten',
    'Darken',
    'Opacity',
    'Threshold',
    'Nega-Posi',
    'BrightnessContrast',
    'Hue-Rotate',
    'Saturate',
    'horizontalFlip',
    'verticalFlip',
    'doubleFlip',
    'horizontalMirror',
    'verticalMirror',
    'XYMirror'
];

var RootContent = React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                <Main/>
                <Footer/>
                <ForkMeImg/>
                <ArrowUpImg/>
            </div>
        );
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <header className="header">
                <nav className="header-nav">
                    <HeaderTitle />
                    <HeaderLink />
                </nav>
            </header>
        )
    }
});

var HeaderTitle = React.createClass({
    render: function () {
        return (
            <div className="header-div">
                <h1 className="header-div-h1">
                    <span >Instagram</span>
                    <br/>JS
                    <br/>Filter
                </h1>
            </div>
        );
    }
});

var HeaderLink = React.createClass({
    render: function () {
        var rows = [];
        types.forEach(function (type) {
            rows.push(<HeaderLinkItem type={type} key={type}/>);
        });
        return (
            <ul className="header-nav-ul">
                {rows}
            </ul>
        );
    }
});

var HeaderLinkItem = React.createClass({
    render: function () {
        var typeName = this.props.type;
        return (
            <li className="header-nav-li">
                <a href={"#main_article_h2_" + typeName.toLowerCase()}
                   className="header-nav-ul-a">
                    {typeName}
                </a>
            </li>
        )
    }
});

var Main = React.createClass({
    render: function () {
        return (
            <main className="main">>
                <MainArticleList/>
            </main>
        );
    }
});

var MainArticleList = React.createClass({
    render: function () {
        var rows = [];
        types.forEach(function (type) {
            rows.push(<MainArticleItem type={type} key={type}/>);
        });
        return (
            <article className="main-article">
                {rows}
            </article>
        );
    }
});

var MainArticleItem = React.createClass({
    render: function () {
        var typeNameLowerCase = this.props.type.toLowerCase();
        return (
            <div>
                <h2 id={"main_article_h2_"}
                    className="main-article-h2">
                    Original
                </h2>
                <img className={"main-article-img instagram-css-filter-"}
                     data-effect={typeNameLowerCase}
                     src={"img/sample.jpg"}/>
            </div>
        )
    }
});

var Footer = React.createClass({
    render: function () {
        return (
            <footer className="footer">
                <ul className="footer-ul">
                    <li className="footer-ul-li">
                        <a href="https://github.com/KENJU/instagram_css_filter"
                           className="footer-ul-li-a">Github</a>
                    </li>
                    <li className="footer-ul-li">
                        <a href="https://KENJU.github.io/" className="footer-ul-li-a">About</a>
                    </li>
                </ul>
                <small className="footer-small">&copy; Copyright 2016 Kenju Wagatsuma</small>
            </footer>
        )
    }
});

var ForkMeImg = React.createClass({
    render: function () {
        return (
            <a target="_blank" href="https://github.com/KENJU/instagram_js_filter">
                <img id="img_fork_me" src={"img/forkme.png"} alt=""/>
            </a>
        )
    }
});

var ArrowUpImg = React.createClass({
    render: function () {
        return (
            <a id="page-top" href="#">
                <img src="img/arrow_up.png" alt=""/>
            </a>
        )
    }
});

ReactDOM.render(
    <RootContent/>,
    document.getElementById('container')
);