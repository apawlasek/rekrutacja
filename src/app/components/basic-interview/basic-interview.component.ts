import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit {
  public tempData;
  public output;

  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
    const jsonData = this.apiService.getData();
    this.tempData = jsonData.map(category => {
      const categoryData = {
        name: category.categoryName,
        questionList: [],
      };

      categoryData.questionList = category.questions.map(question => {
        const questionData = {
          questionText: question.questionText,
          answerList: [],
        };

        questionData.answerList = question.answers.map(answer => {
          return {
            answerText: answer.answerText,
            control: new FormControl(answer.state)
          };
        });

        return questionData;
      });

      return categoryData;
    });
    // console.log(this.tempData);
    // console.log(JSON.stringify(this.tempData, null, 4));
    this.serialize();
  }

  public serialize() {
    let output = '';

    this.tempData.forEach(category => {

      output += `<div><strong>${category.name}</strong>:</div>`;


    });


    this.output = output;

  }

}
