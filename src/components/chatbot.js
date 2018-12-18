import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import renderHTML from 'react-render-html';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { init, fetchMessages, sendForm, sendPicture } from '../actions/chatbot';


class Chatbot extends React.Component {
    
    state = {
        
        openContainer: false,
        isHiddenButton: false,
        isComposed: false,
        isConfirm: false,
        messageText: ''
    };
    componentDidMount() {
        if (window.innerWidth > 480) {
            this.setState({
                openBot: false,
                isComposed: true,
            })
            this.props.init()
        }
    }
    openBot = () => {
        this.setState({
            openContainer: true,
            isHiddenButton: true,
            isComposed: false
        });
        if (this.props.session_id.length === 0)
            this.props.init();
    }
    closeBot = () => {
        this.setState({
            openContainer: false, isComposed: false,
            isHiddenButton: false
        });
    }
    isConfirm = () => {
        this.setState({ isConfirm: true });
    }
    changeText = (event) => {
        this.setState({
            messageText: event.target.value
        })
    }
    scrollToBottom = () => {
        const { messageList } = this.refs;
        const scrollHeight = messageList.scrollHeight;
        const height = messageList.clientHeight;
        const maxScrollTop = scrollHeight - height;
        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    submitForm = (event) => {
        event.preventDefault();
        if (this.state.messageText.length === 0) {
            return false;
        }
        this.props.sendForm(this.state.messageText);
        this.setState({ messageText: '' })
    }

    changeFile = (event) => { this.props.sendPicture(event) }
    render() {
        const addMessages = this.props.messages.map((item, index) => {

            let text = '', img = '';
            if (item.text) {
                text = <p>{renderHTML(item.text)}</p> 
            }
            if (item.imgSrc) {
                img = <img src={`${item.imgSrc}`} />
            }     
            if(item.scrollToBottom) {
                setTimeout(()=> {
                   this.scrollToBottom()
                }, 50)
            }
            return (
                <Fragment key={index}>
                    <div className={`chatbot__chat__message ${item.from === 'bot' ? 'chatbot__chat__message--bot' : 'chatbot__chat__message--user'}`}>
                        <div className='inner-container'>
                            {text}
                            {img}
                        </div>
                    </div>
                </Fragment>
            )
        })

        return (
            <div className="chatbot-wrapper">
                <a href="javascript:;" onClick={this.openBot} className={`chatbot-open-btn js-chatbot-open-btn  ${this.state.isHiddenButton ? 'is-hidden' : ''}`}></a>

                <div className={`chatbot-container js-chatbot-container ${this.state.isComposed ? 'is-composed' : ''} ${this.state.openContainer ? 'is-shown' : 'is-hidden'}`}>
                    <div className="chatbot-header">
                        <div className="chatbot-header__logo">
                            <img src="https://avia.splat.cleverbots.ru/temporary_static/img/logo-online.png" alt="" />
                        </div>
                        <div className="chatbot-header__company">
                            SPLAT
            </div>
                        <a onClick={this.closeBot} href="javascript:;" className="chatbot-header__closer js-chatbot-header__closer"></a>
                    </div>
                    <div ref="messageList" className="chatbot__chat-wrapper  js-chatbot__chat-wrapper">
                        <div className="chatbot__chat cf">
                            {addMessages}
                        </div>
                    </div>
                    <div className="chatbot__controls">
                        <form id="chatbot__form" className="chatbot__form" onSubmit={this.submitForm} encType="multipart/form-data">
                            <div className="form-field">
                                <label htmlFor="input-file" className="label-file"></label>
                                <input type="file" id="input-file" onChange={this.changeFile} name="input-file" accept="image/*,image/jpeg" />
                            </div>
                            <div className="form-field form-field--text">
                                <label htmlFor="input-text"></label>
                                <input type="text" id="input-text" value={this.state.messageText} onChange={this.changeText} className="input-text" placeholder="Введите сообщение..." autoComplete="off" />
                            </div>
                            <button type="submit" className="submit"></button>
                        </form>
                    </div>
                    <div className={`chatbot__overlay ${this.state.isConfirm ? 'is-confirm' : ''}`}>
                        <p>
                            Даю согласие на получение рекламных, информационных СМС сообщений на указанный номер.
                            Подтверждаю, что данный номер телефона принадлежит мне. Со способом отказа от сообщений
                            ознакомлен.
           </p>
                        <a href="javascript:;" onClick={this.isConfirm} className={'legal-btn'}>Даю согласие</a>
                    </div>
                </div>
            </div>

        );
    }
}
const mapDispatchtoProps = dispatch => bindActionCreators({ init, sendForm, fetchMessages, sendPicture }, dispatch);
const mapStateToProps = state => ({
    session_id: state.chatbot.session_id,
    messages: state.chatbot.messages
});

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(Chatbot);


