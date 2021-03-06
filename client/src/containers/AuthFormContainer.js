import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import AuthForm from "../components/AuthForm";

import {authUser, createUser} from "../api";
import {saveToken} from "../localStorageUtils";
import {locationSelector} from "../store/router";
import {authLoginAction, authSelector} from "../store/auth";
import {asyncActionErrorShow} from "../store/error";

const mapStateToProps = (state) => ({
	...locationSelector(state),
	...authSelector(state)
});

const mapDispatchToProps = {
	loginAction: authLoginAction,
	errorAction: asyncActionErrorShow,
	pushAction: push
};

const enhance = connect(mapStateToProps, mapDispatchToProps);


class AuthFormContainer extends Component {
	static propTypes = {
		location: PropTypes.object,
		auth: PropTypes.object,
		loginAction: PropTypes.func,
		errorAction: PropTypes.func,
		pushAction: PropTypes.func
	};

	state = {
		username: "",
		password: "",
	};


	/**
	 * Устанавливаем значения логина / пароля
	 * @param event
	 */
	setUsername = (event) => this.setState({username: event.target.value});
	setPassword = (event) => this.setState({password: event.target.value});


	/**
	 * Auth авторизуемся и сохраняем токен в localStorage
	 * @returns {Promise<void>}
	 */
	auth = async () => {
		const {username, password} = this.state;
		const {loginAction, errorAction, pushAction} = this.props;

		try {
			const {userId, accessToken} = await authUser(username, password);
			await saveToken(userId, accessToken);

			loginAction(userId, accessToken);
			pushAction("/courses");
		} catch (e) {
			const message = e.message ? e.message : "Username or password is incorrect";
			errorAction(message, e);
		}
	};


	/**
	 * Создаем нового пользователя
	 * @returns {Promise<void>}
	 */
	regs = async () => {
		const {username, password} = this.state;
		const {errorAction} = this.props;

		try {
			await createUser(username, password);
			await this.auth();
		} catch (e) {
			const message = e.message ? e.message : "Create user error";
			errorAction(message, e);
		}
	};


	/**
	 * Render
	 * @returns {*}
	 */
	render() {
		return (
			<AuthForm username={this.state.username}
								password={this.state.password}
								setUsername={this.setUsername}
								setPassword={this.setPassword}
								login={this.auth}
								regs={this.regs}
			/>
		);
	}
}

export default enhance(AuthFormContainer);
