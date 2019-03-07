import cc from './ccjs/cc';

const WHITE = 'rgb(222,222,222)';
const BLACK = 'rgba(0,0,0, 0.9)';
const BLACK_SOLID = 'rgb(25, 25, 25)';
const RED = '#d63031';
const viewContent = {
    Home: function () {
        return cc.createElement('h1')
            .content("Let's Sell")
            .css({
                textAlign: 'center'
            })
    },
    About: function () {
        return cc.createElement('p').content('Our company markets your company directly to a broad range of targeted buyers, always maintaining total confidentiality and controlling all access to your information.')
    },
    'Products/Services': function () {
        let list = cc.createElement('ul');
        list.add('li')
            .content('Help you sell your company at best value.');
        list.add('li')
            .content('Evaluate the value of your company');
        list.add('li')
            .content('Help your company go public');
        return list;
    },
    News: function (){
        return cc.createElement('p').content('No news')
    },
    Contacts: function () {
        let p = cc.createElement('p');
        cc.request({
            url: 'contacts.php',
            done: function (data, res) {
                p.content(res.responseText);
            }
        });
        return p;
    }
};



cc.setValue('viewport', {width: window.innerWidth, height: window.innerHeight});
window.addEventListener('resize', function () {
    cc.updateValue('viewport', {width: window.innerWidth, height: window.innerHeight});
});
function index() {
    let root = cc.select('#body');
    let mainContainer = cc.createElement('div', 'test')
        .css({
            background: BLACK,
            height: '100vh',
            width: '100vw',
            boxShadow: BLACK + '0 0 10px 20px'
        });
    let header = mainContainer.add('div', 'header')
        .css({
            height: '88px',
            width: '100vw',
        });
    let headerTag = ['Home', 'About', 'Products/Services', 'News', 'Contacts'];
    headerTag.forEach(function (tag) {
        header.add('div', `header-${tag}`)
            .content(tag)
            .css({
                display: 'inline-block',
                padding: '16px',
                textAlign: 'center',
                color: WHITE,
                cursor: 'pointer',
                transition: '0.2s'
            })
            .on('mouseenter', function () {
                this.css({
                    textShadow: '0 0 10px WHITE',
                })
            })
            .on('mouseleave', function () {
                this.css({
                    textShadow: '',
                })
            })
            .on('click', function () {
                cc.setValue('currentView', tag)
            })
            .bind('currentView', function (currentView) {
                this.css({
                    boxShadow: currentView === tag ? `inset 0 -10px 0px -8px ${WHITE}` : ''
                })
            });
    });

    let viewContainer = mainContainer.add('div', 'viewContainer')
        .css({
            padding: '0 64px',
            color: WHITE
        })
        .bind('currentView', function (currentView) {
            let self = this;
            self.removeAllChildren();
            self.addElement(viewContent[currentView]());
        });

    root.appendChild(mainContainer);
    cc.setValue('currentView', 'Home')
}
index();