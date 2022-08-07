import Card from './card';
import { getParameterByName, formatNumber } from '../lib/utils';
import { queryTinybirdEndpoint } from '../lib/tinybird';
import LightLogo from '../assets/tb-white.png';
import DarkLogo from '../assets/tb-dark.png';

export default class Card extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        this.render();
        this.update();
        
        const updateSeconds = getParameterByName('update-seconds');
        if (updateSeconds) {
            setInterval(() => {
                this.update();
            }, Math.max(updateSeconds, 5) * 1000);
        }
    }

    render() {
        const logo = !(getParameterByName('logo') === 'false');
        const theme = (getParameterByName('theme') || 'light').toLowerCase();
        const logoSrc = theme === 'light' ? DarkLogo : LightLogo;
        this.shadow.innerHTML = `
            <style>
                .card {
                    border: 1vh solid #e6e6e6;
                    padding: 15vh 10vw;
                    border-radius: 8vw;
                    width: 100vw;
                    max-width: 100vw;
                    height: 100vh;
                    max-height: 100vh;
                    box-sizing: border-box;
                }

                .card.green {
                    border: none;
                    background: rgb(32,201,151);
                    background: -moz-linear-gradient(135deg, rgba(32,201,151,1) 0%, rgba(11,191,220,1) 100%);
                    background: -webkit-linear-gradient(135deg, rgba(32,201,151,1) 0%, rgba(11,191,220,1) 100%);
                    background: linear-gradient(135deg, rgba(32,201,151,1) 0%, rgba(11,191,220,1) 100%);
                    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#20c997",endColorstr="#0bbfdc",GradientType=1);
                    color: #fff;
                }

                .card.dark {
                    border: none;
                    background: var(--dark-background);
                    color: #fff;
                }

                label.card-title {
                    font-size: 6vw;
                    text-transform: uppercase;
                    font-weight: bold;
                    line-height: 10vw;
                }

                p.card-metric {
                    margin-bottom: 0;
                    font-weight: bold;
                    font-size: 12vw;
                    margin-top: 12%;
                }

                img.logo {
                    position: absolute;
                    top: 15vh;
                    right: 8vw;
                    height: 10vw;
                }
            </style>
            
            <div class="card ${theme}">
               <label class="card-title">${ getParameterByName('title') }</label>
               <p class="card-metric">${ formatNumber(this.metricValue) }</p>
               ${logo ? `<img class="logo" src="${logoSrc}"/>` : ''}
            </div>
        `;
    }

    set metricValue(val) {
        this._metricValue = val;
        this.render();
    }
    
    get metricValue(){
        return this._metricValue;
    }

    async update() {
        const metric = getParameterByName('metric');
        const endpoint = getParameterByName('endpoint');
        const result = await queryTinybirdEndpoint(decodeURI(endpoint));
        const metricValue = result.data.reduce((prev, curr) => {
            return prev + Number(curr[metric] || 0)
        }, 0);
        this.metricValue = metricValue;
        this.render();
    }
};
