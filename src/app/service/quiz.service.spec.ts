import {TestBed} from '@angular/core/testing';

import {QuizService} from "./quiz.service";
import {Question} from "../model/data.models";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TestService', () => {

  let service: QuizService;

  const mockQuiz : Question[] = [
    {question:'question1',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a1',incorrect_answers:['a2','a3','a4'],type:'multiple'},
    {question:'question2',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a2',incorrect_answers:['a1','a3','a4'],type:'multiple'},
    {question:'question3',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a3',incorrect_answers:['a1','a2','a4'],type:'multiple'},
    {question:'question4',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a4',incorrect_answers:['a1','a3','a2'],type:'multiple'},
    {question:'question5',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a2',incorrect_answers:['a1','a3','a4'],type:'multiple'}
  ];

  const mockQuestion : Question = {question:'question6',difficulty:'easy',category:'category',all_answers:['a1','a2','a3','a4'],correct_answer:'a2',incorrect_answers:['a1','a3','a4'],type:'multiple'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test methode computeSwitchQuestion',()=>{
    it('should return old quiz with bad question',()=>{
      let ret:Question[] = service.computeSwitchQuestion({} as Question,mockQuiz,mockQuiz);
      expect(ret).toEqual(mockQuiz);
    });
    it('should return old quiz with bad newQuiz',()=>{
      let ret:Question[] = service.computeSwitchQuestion(mockQuestion,mockQuiz, []);
      expect(ret).toEqual(mockQuiz);
    });
    it('should return Empty array',()=>{
      let ret:Question[] = service.computeSwitchQuestion(mockQuestion,[], []);
      expect(ret.length).toEqual(0);
    });
    it('should new question in new quiz',()=>{
      let ret:Question[] = service.computeSwitchQuestion(mockQuiz[0],mockQuiz, [mockQuestion]);
      expect(ret).toContain(mockQuestion);
    });
    it('should question[0] not in new quiz',()=>{
      let ret:Question[] = service.computeSwitchQuestion(mockQuiz[0],mockQuiz, [mockQuestion]);
      expect(ret).not.toContain(mockQuiz[0]);
    });
  })

});
