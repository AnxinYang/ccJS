import cc from './ccjs/cc';

const WHITE = 'rgba(255,255,255, 0.7)';
const BLACK = 'rgba(0,0,0, 0.9)';
const BLACK_SOLID = 'rgb(25, 25, 25)';
const RED = '#d63031';

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
        })
        .data({
            animationCounter: 0,
        })
        .bind('frame', function (d) {
            let counter = this.getData().animationCounter;
            this.css({
                opacity: counter / 60
            });
            this.data({animationCounter: counter + 1});
            if (counter >= 60) {
                this.unbind('frame')
            }
        });

    root.appendChild(mainContainer);
    let container = mainContainer.add('div')

    let header = container.add('div', 'header')
        .css({
            display: 'flex',
            padding: '0 12.5%',
            paddingTop: '32px',
            paddingBottom: '16px',
            color: WHITE,
            fontWeight: 'bold',
            justifyContent: 'space-between',
            boxShadow: BLACK + ' 0 0 20px',
            position: 'relative',
            zIndex: 10,
            background: BLACK_SOLID
        });
    let headerLeft = header.add('div')
        .css({
            display: 'inline-block',
            minWidth: '256px'
        });
    let logo = headerLeft.add('div')
        .content('A')
        .css({
            background: RED,
            fontSize: '64px',
            padding: '0 16px',
            lineHeight: '54px',
            marginRight: '4px',
            display: 'inline-block',
            boxShadow: RED + ' 0 0 10px',
            color: BLACK
        });

    let nameContainer = headerLeft.add('div')
        .css({
            display: 'inline-block'
        });
    nameContainer.add('span')
        .content('NXIN YANG')
        .css({
            fontSize: '32px',
            display: 'block',
        });
    nameContainer.add('span')
        .content('Front-End Developer')
        .css({
            fontSize: '16px',
            display: 'block'
        });
    let menu = header.add('div')
        .css({
            display: 'flex',
            fontSize: '16px',
        });
    let menuList = ['fa-linkedin'];
    let links = ['https://www.linkedin.com/in/anxin-yang-707029125/'];
    let hoverColors = ['#0077B5'];
    menuList.forEach(function (tag, idx) {
        menu.add('i')
            .addClass('fab')
            .addClass(menuList[idx])
            .css({
                cursor: 'pointer',
                lineHeight: '54px',
                textAlign: 'center',
                fontSize: '32px',
                textShadow: ' 0 0 5px',
                transition: '0.3s'
            })
            .on('click', function () {
                window.open(links[idx], '_blank')
            })
            .on('mouseenter', function () {
                this.css({
                    color: '#0077B5',
                })
            }, 'style')
            .on('mouseleave', function () {
                this.css({
                    color: '',
                })
            }, 'style');
    });

    let mainContentContainer = cc.createElement('div')
        .css({
            height: 'calc(100vh - 100px)',
            padding: '0 12.5%',
            paddingTop: '25vh',
            color: WHITE,
            overflowY: 'auto',
            position: 'relative',
            zIndex: 5,
        })
        .on('mousemove', function (e) {
            let centerX = window.innerWidth / 2;
            let centerY = window.innerHeight / 2;
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            this.css({
                transform: 'translate(' + (-(mouseX - centerX) / 100) + 'px,' + (-(mouseY - centerY) / 100) + 'px)'
            });
        })
        .bind('frame', function () {
            let doms = cc.select('.fade');
            for (let i = 0; i < doms.length; i++) {
                let dom = doms[i];
                let isInViewPort = dom.isInViewport({offsetY: 120});
                let opacity = +dom.style.opacity;
                if (opacity > 0 && !isInViewPort) {
                    opacity = opacity - 0.05;
                }
                if (opacity < 1 && isInViewPort) {
                    opacity = opacity + 0.03;
                }
                let translateY = 30 - opacity * 30;
                dom.css({
                    opacity: opacity,
                    transform: 'translateY(' + translateY + 'px)'
                })
            }
        });
    let highLight = mainContentContainer.add('div')
        .content("Let's make data alive")
        .addClass('fade')
        .css({
            color: WHITE,
            fontWeight: 'bold',
            fontSize: '48px',
            textAlign: 'center',
        });
    let intro = mainContentContainer.add('p')
        .addClass('fade')
        .content("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich " +
            "interactive websites and web apps from small to large. ")
        .css({
            fontSize: '20px',
        });

    let skillContainer = mainContentContainer.add('div');
    let skillTitle = skillContainer.add('div')
        .content("Skills")
        .css({
            color: WHITE,
            fontWeight: 'bold',
            fontSize: '48px',
            textAlign: 'center',
            marginTop: '256px'
        });

    let skillCardContainer = skillContainer.add('div')
        .css({
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '128px',
            flexWrap: 'wrap'
        });

    let skills = ['fa-html5', 'fa-js', 'fa-css3-alt', 'fa-react', 'fa-node-js'];
    let skillNames = ['HTML5', 'Javascript', 'CSS3', 'React', 'NodeJS'];
    let skillColors = ['#e44d26', '#eeaf4b', '#0070ba', '#61dafb', '#7cb700'];
    skills.forEach(function (icon, idx) {
        let card = skillCardContainer.add('div')
            .addClass('fade').addClass('fade')
            .css({
                minWidth: '300px',
                textAlign: 'center',
                flexGrow: 1,
            });
        let logo = card.add('i')
            .addClass('fab')
            .addClass(icon)
            .css({
                fontSize: '256px',
                display: 'block',
                color: skillColors[idx],
                textShadow: skillColors[idx] + ' 0 0 10px'
            });
        let name = card.add('p')
            .content(skillNames[idx])
            .css({
                fontSize: '32px',
                fontWeight: 'bold',
                textAlign: 'center'
            })
    });

    let careerContainer = mainContentContainer.add('div');
    let careerTitle = skillContainer.add('div')
        .content("Career")
        .css({
            color: WHITE,
            fontWeight: 'bold',
            fontSize: '48px',
            textAlign: 'center',
            marginTop: '128px',
            marginBottom: '64px',
        });

    let companies = ['netElastic Systems, Inc.', 'San Francisco State University', 'Shanghai University'];
    let titles = ['Software Engineer', 'BS - Computer Engineering Student', 'AS - Computer Application Technology Student'];
    let timeLines = ['2017 - Current', '2013 - 2017', '2009 - 2013'];
    let projects = {
        'netElastic Systems, Inc.': ['vBNG Management System (UI Lead)', 'SD-WAN Management System (UI Team Member)',]
    };

    companies.forEach(function (companyName, idx) {
        let card = careerContainer.add('div')
            .addClass('fade')
            .css({
                textAlign: 'center',
                marginBottom: '64px'
            });
        let company = card.add('div')
            .content(companyName)
            .css({
                fontSize: '32px',
                fontWeight: 'bold'
            });

        let fontSize = '20px';
        let title = card.add('div')
            .content(titles[idx])
            .css({
                fontSize: fontSize,
            });

        let timeLine = card.add('div')
            .content(timeLines[idx])
            .css({
                fontSize: fontSize,
            });
        (projects[companyName] || []).forEach(function (project) {
            card.add('div')
                .content(project)
                .css({
                    fontSize: fontSize,
                });
        });

    });

    let footer = mainContentContainer.add('p')
        .content('This website is build by ccJS, a self-implemented Javascript Library.')
        .css({
            textAlign: 'center',
            marginTop: '128px'
        });

    let codeBackgroundText = index.toString();
    let columnWidth = Math.min(400 , window.innerWidth - 128);
    let columnCount = Math.min(2, Math.floor(window.innerWidth/(columnWidth)));
    let codeBackground = container.add('pre')
        .css({
            textAlign: 'left',
            top: '128px',
            left: '64px',
            position: 'fixed',
            color: 'rgba(255,255,255, 0.06)',
            zIndex: 0,
            columnCount: columnCount,
            columnWidth: columnWidth + 'px',
            width: 'calc(100vw - 128px)',
        })
        .data({
            counter: 0,
        })
        .bind('frame', function () {
            let {counter, str} = this.getData();
            this.css({
                transform: 'translateY(' + (-mainContentContainer.scrollTop/6) + 'px)'
            });
            counter+=24;
            if(counter >= codeBackgroundText.length){
                counter = codeBackgroundText.length - 1;
            }else{
                this.innerText = codeBackgroundText.substring(0, counter) + '_';
            }
            this.data({counter: counter})
        })
        .bind('viewport', function (d) {
            let {height, width} = d;
            let columnWidth = Math.min(400 , width - 128);
            let columnCount = Math.min(2, Math.floor(width/(columnWidth)));
            this.css({
                columnCount: columnCount,
                columnWidth: columnWidth + 'px',
            })
        });


    mainContainer.addElement(container);
    container.addElement(header);
    container.addElement(mainContentContainer);
}
index();