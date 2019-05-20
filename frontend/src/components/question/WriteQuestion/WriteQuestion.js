import React, { Component } from 'react';
import styles from './WriteQuestion.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import Header from '../../base/Header';
import Footer from '../../base/Footer';

const cx = classNames.bind(styles);

class WriteQuestion extends Component {
	state = {
		title: '',
		content: '',
		tags: [],
		point: 0,
		anonymous: 1,
	};
  render() {
    const handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
		};
		let tag = '';
		const handleTagChange = e => {
			tag = e.target.value;
		};
		const handleTags = () => {
			this.setState({
				tags: [...this.state.tags, tag]
			});
			alert(tag);
			tag = '';
		};
		const handleCheckBoxChange = e => {
			if (e.target.checked) {
				this.setState({
					anonymous: 0
				});
			} else {
				this.setState({
					anonymous: 1
				});
			}
		};
		const handleSubmit = async () => {
			await axios
			.post('http://localhost:8000/question', this.state)
			.then(response => {
				alert('질문 작성 성공');
				console.log(JSON.stringify(response));
			})
			.catch(error => {
				console.log(error);
			});
		}
    return(
      <div className={cx('write-question')}>
        <Header />
					질문 <input name='title' onChange={handleChange} /><br/>
					<textarea name='content' onChange={handleChange} rows='20' cols='50' placeholder="답변이 등록되면 질문 수정 및 삭제가 불가능합니다."></textarea><br/>
					카테고리 <input name='category' onChange={handleChange} /><br/>
					태그 <input name='tag' onChange={handleTagChange} /><button onClick={handleTags}>추가</button><br/>
					추가 내공 
					<select id='point'>
						<option value='0'>0</option>
						<option value='10'>10</option>
						<option value='20'>20</option>
						<option value='30'>30</option>
						<option value='40'>40</option>
						<option value='50'>50</option>
						<option value='60'>60</option>
						<option value='70'>70</option>
						<option value='80'>80</option>
						<option value='90'>90</option>
						<option value='100'>100</option>
					</select><br/>
					공개 설정 <input name='anonymous' type='checkbox' onClick={handleCheckBoxChange} /><br/>
					<button onClick={handleSubmit}>질문</button>
        <Footer />
      </div>
    );
  }
}

export default WriteQuestion;
