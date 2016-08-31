/**
 * render.js
 */

var RootContent = React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                <Main/>
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

// TODO: could be refactored
var HeaderLink = React.createClass({
    render: function () {
        return (
            <ul className="header-nav-ul">
                <li className="header-nav-li"><a href="#main_article_h2_original"
                                                 className="header-nav-ul-a">Original</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_lark" className="header-nav-ul-a">Lark</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_reyes" className="header-nav-ul-a">Reyes</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_juno" className="header-nav-ul-a">Juno</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_slumber" className="header-nav-ul-a">Slumber</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_crema" className="header-nav-ul-a">Crema</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_ludwig" className="header-nav-ul-a">Ludwig</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_aden" className="header-nav-ul-a">Aden</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_perpetua"
                                                 className="header-nav-ul-a">Perpetua</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_amaro" className="header-nav-ul-a">Amaro</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_mayfair" className="header-nav-ul-a">Mayfair</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_rise" className="header-nav-ul-a">Rise</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_hudson" className="header-nav-ul-a">Hudson</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_valencia"
                                                 className="header-nav-ul-a">Valencia</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_xpro2" className="header-nav-ul-a">X Pro II</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_sierra" className="header-nav-ul-a">Sierra</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_willow" className="header-nav-ul-a">Willow</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_lofi" className="header-nav-ul-a">Lo-Fi</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_earlybird"
                                                 className="header-nav-ul-a">Earlybird</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_brannan" className="header-nav-ul-a">Brannan</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_inkwell" className="header-nav-ul-a">Inkwell</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_hefe" className="header-nav-ul-a">Hefe</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_nashville"
                                                 className="header-nav-ul-a">Nashville</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_sutro" className="header-nav-ul-a">Sutro</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_toaster" className="header-nav-ul-a">Toaster</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_walden" className="header-nav-ul-a">Walden</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_1977" className="header-nav-ul-a">1977</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_kelvin" className="header-nav-ul-a">Kelvin</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_grayscale"
                                                 className="header-nav-ul-a">Grayscale</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_sepia" className="header-nav-ul-a">Sepia</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_luminance"
                                                 className="header-nav-ul-a">Luminance</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_brighten"
                                                 className="header-nav-ul-a">Brighten</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_darken"
                                                 className="header-nav-ul-a">Darken</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_opacity"
                                                 className="header-nav-ul-a">Opacity</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_threshold"
                                                 className="header-nav-ul-a">Threshold</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_negaposi"
                                                 className="header-nav-ul-a">Nega-Posi</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_brightnessContrast"
                                                 className="header-nav-ul-a">Brightness
                    Contrast</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_huerotate" className="header-nav-ul-a">Hue-Rotate</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_saturate"
                                                 className="header-nav-ul-a">Saturate</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_horizontalFlip"
                                                 className="header-nav-ul-a">horizontalFlip</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_verticalFlip" className="header-nav-ul-a">verticalFlip</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_doubleFlip" className="header-nav-ul-a">doubleFlip</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_horizontalMirror"
                                                 className="header-nav-ul-a">horizontalMirror</a>
                </li>
                <li className="header-nav-li"><a href="#main_article_h2_verticalMirror"
                                                 className="header-nav-ul-a">verticalMirror</a></li>
                <li className="header-nav-li"><a href="#main_article_h2_XYMirror"
                                                 className="header-nav-ul-a">XYMirror</a>
                </li>
            </ul>
        );
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
        return (
            <article className="main-article">
                <MainArticleItemHeader/>
                <MainArticleItemImg/>
            </article>
        );
    }
});

var MainArticleItemHeader = React.createClass({
    render: function () {
        return (
            <h2 id="main_article_h2_original" className="main-article-h2">
                Original
            </h2>
        );
    }
});
var MainArticleItemImg = React.createClass({
    render: function () {
        return (
            <img className="main-article-img instagram-css-filter-lark" src={"img/sample.jpg"}/>
        );
    }
});

ReactDOM.render(
    <RootContent/>,
    document.getElementById('container')
);