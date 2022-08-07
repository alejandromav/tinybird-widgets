import Card from './card';
import { getParameterByName, formatNumber } from '../lib/utils';
import { queryTinybirdEndpoint } from '../lib/tinybird';

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
        const theme = (getParameterByName('theme') || 'light').toLowerCase();
        this.shadow.innerHTML = `
            <style>
                .card {
                    border: 1px solid #e6e6e6;
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
                }

                p.card-metric {
                    margin-bottom: 0;
                    font-weight: bold;
                    font-size: 11vw;
                }
            </style>
            
            <div class="card ${theme}">
               <label class="card-title">${ getParameterByName('title') }</label>
               <p class="card-metric">${ formatNumber(this.metricValue) }</label>
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
