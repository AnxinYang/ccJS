import cc from './ccjs/cc';
import analyser from './analyser';
const WHITE = 'rgba(255,255,255, 0.7)';
const BLACK = 'rgba(0,0,0, 0.9)';
const RED = '#d63031';

cc.setValue('viewport', {width: window.innerWidth, height: window.innerHeight});
window.addEventListener('resize', function () {
    cc.updateValue('viewport', {width: window.innerWidth, height: window.innerHeight});
});
function index() {
    let root = cc.select('#body');
    let mainContainer = cc.createElement('div', 'test')
        .addClass('main-container');

    root.appendChild(mainContainer);
    let container = mainContainer.add('div')

    let header = container.add('div', 'header')
        .addClass('header');
    let headerLeft = header.add('div')
        .css({
            display: 'inline-block',
            minWidth: '256px'
        });
    let logo = headerLeft.add('div')
        .content('A')
        .addClass('background-red')
        .addClass('font-black')
        .css({
            fontSize: '64px',
            padding: '0 16px',
            lineHeight: '54px',
            marginRight: '4px',
            display: 'inline-block',
            boxShadow: RED + ' 0 0 10px',
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
    let menuList = ['fa-linkedin', 'fa-github'];
    let links = ['https://www.linkedin.com/in/anxin-yang-707029125/', 'https://github.com/AnxinYang'];
    let hoverColors = ['#0077B5', 'rgba(255,0,80, 0.8)'];
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
                transition: '0.3s',
                marginRight: '16px'
            })
            .on('click', function () {
                window.open(links[idx], '_blank')
            })
            .on('mouseenter', function () {
                this.css({
                    color: hoverColors[idx],
                })
            }, 'style')
            .on('mouseleave', function () {
                this.css({
                    color: '',
                })
            }, 'style');
    });

    let mainContentContainer = cc.createElement('div', 'main_content')
        .css({
            height: 'calc(100vh - 104px)',
            padding: '0 12.5%',
            color: WHITE,
            overflowY: 'auto',
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column'
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
            if(doms.length===0){
                this.unbind('frame')
            }
            for (let i = 0; i < doms.length; i++) {
                let dom = doms[i];
                let isInViewPort = dom.isInViewport({offsetY: 150});
                let opacity = +dom.style.opacity;
                if (isInViewPort) {
                    dom.addClass('slide-in-bottom');
                    dom.removeClass('fade-out');
                }else {
                    dom.removeClass('slide-in-bottom');
                    dom.addClass('fade-out');
                }
            }
        });
    let landingContainer = mainContentContainer.add('div')
        .css({
            height: 'calc(100vh - 104px)'
        });
    let highLight = landingContainer.add('div')
        .content("Let's make data alive")
        .addClass('fade')
        .css({
            color: WHITE,
            fontWeight: 'bold',
            fontSize: '48px',
            textAlign: 'center',
            marginTop: 'calc(50vh - 152px)'
        });
    let intro = landingContainer.add('p')
        .addClass('fade')
        .content("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich " +
            "interactive websites and web apps from small to large. ")
        .css({
            fontSize: '20px',
        });
    let player = landingContainer.add('div')
            .css({
                fontSize: '64px',
                width: '100%',
                textAlign: 'center'
            })
        .add('i')
        .addClass('far')
        .addClass('fa-play-circle')
        .css({
            cursor: 'pointer'
        })
        .on('mouseover', function () {
            this.css({
                color: 'rgba(255,0,80, 0.8)'
            });
            playerWarn.css({
                display: ''
            });
        })
        .on('mouseleave', function () {
            this.css({
                color: ''
            });
            playerWarn.css({
                display: 'none'
            });
        })
        .on('click', function () {
            if(cc.getValue('play')){
                cc.setValue('play', false);
                this.removeClass('fa-pause-circle');
                this.addClass('fa-play-circle');
            }else{
                cc.setValue('play', true);
                this.addClass('fa-pause-circle');
                this.removeClass('fa-play-circle');
            }
        });
    let playerWarn = landingContainer.add('p')
        .content('Watch you volume :)')
        .css({
            textAlign:'center',
            display: 'none',
            color:'rgba(255,0,80, 0.8)'
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

    let skills = ['fa-html5', 'fa-js', 'fa-css3-alt', 'fa-react', 'fa-node-js','fa-sass'];
    let skillNames = ['HTML5', 'Javascript', 'CSS3', 'React', 'NodeJS', 'SASS'];
    let skillColors = ['#e44d26', '#eeaf4b', '#0070ba', '#61dafb', '#7cb700','#c69'];
    skills.forEach(function (icon, idx) {
        let card = skillCardContainer.add('div')
            .addClass('fade')
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
                textAlign: 'center',
                color: skillColors[idx],
                textShadow: skillColors[idx] + ' 0 0 10px'
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
        .content('Powered by ccJS, a self-implemented Javascript Library.')
        .css({
            textAlign: 'center',
            marginTop: '128px'
        });

    let footShadow = container.add('div')
        .css({
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 10,
            pointerEvents:   'none'
            //boxShadow: 'rgba(255, 0, 80, 0.8) 0px 0px 50px 2px'
        });
    analyser(footShadow);
    let codeBackgroundText = index.toString();
    let columnWidth = Math.min(400 , window.innerWidth - 128);
    let columnCount = Math.min(2, Math.floor(window.innerWidth/(columnWidth)));
    let codeBackground = container.add('pre')
        .addClass('crtText')
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
            opacity: 0.3
        })
        .data({
            counter: 0,
        })
        .bind('frame', function () {
            let {counter, str} = this.getData();
            this.css({
                transform: 'translateY(' + (-mainContentContainer.scrollTop/6) + 'px)'
            });
            counter+=4;
            if(counter >= codeBackgroundText.length){
                //counter = codeBackgroundText.length - 1;
                return false;
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