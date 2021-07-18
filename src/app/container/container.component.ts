import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  readonly ROOT_URL = 'http://localhost:8080';

  // title = 'Container';
  teachers: any = null;
  subjects: any = null;
  selectedTeacher: any = null;
  selectedSubject: any = null;
  selectedTeacherForDelete: any = null;
  selectedSubjectForDelete: any = null;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTeachers();
    this.getSubjects();
  }

  getTeachers() {
    //get returns an Observable
    this.http.get(this.ROOT_URL + '/teacher').subscribe(data => {
      this.teachers = data;
      console.log(this.teachers);
    });
  }

  getSubjects() {
    //get returns an Observable
    this.http.get(this.ROOT_URL + '/subject').subscribe(data => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }

  createTeacher(teacher: any) {
    this.http.post(this.ROOT_URL + '/teacher', teacher, {observe: 'response'}).subscribe(response =>{
      if(response.status == 201) {
        this.selectedTeacher = null;
        this.getTeachers();
      }
    }, error => {
      console.log(error);
    },)
  }

  updateTeacher(teacher: any, id: any) {
    this.http.put(this.ROOT_URL + '/teacher/' + id, teacher, {observe: 'response'}).subscribe(response =>{
      if(response.status == 200) {
        this.selectedTeacher = null;
        this.getTeachers();
      }
    }, error => {
      console.log(error);
    },)
  }

  onSubmitTeacher(data: any) {
    console.log(data);
    if(data.id) {
      this.updateTeacher(data, data.id);
    } else {
      this.createTeacher(data);
    }
  }

  onDeleteTeacher() {
    if(this.selectedTeacherForDelete) {
      const idTeacher = this.selectedTeacherForDelete.id;
      this.http.delete(this.ROOT_URL + '/teacher/' + idTeacher, {observe: 'response'}).subscribe(response =>{
        if(response.status == 200) {
          this.selectedTeacherForDelete = null;
          this.getTeachers();
        }
      });
    }
  }

  createSubject(subject: any) {
    this.http.post(this.ROOT_URL + '/subject', subject, {observe: 'response'}).subscribe(response =>{
      if(response.status == 201) {
        this.selectedSubject = null;
        this.getSubjects();
      }
    }, error => {
      console.log(error);
    },)
  }

  updateSubject(subject: any, id: any) {
    this.http.put(this.ROOT_URL + '/subject/' + id, subject, {observe: 'response'}).subscribe(response =>{
      if(response.status == 200) {
        this.selectedSubject = null;
        this.getSubjects();
      }
    }, error => {
      console.log(error);
    },)
  }

  onSubmitSubject(data: any) {
    if(data.id) {
      this.updateSubject(data, data.id);
    } else {
      this.createSubject(data);
    }
  };

  onDeleteSubject() {
    if(this.selectedSubjectForDelete) {
      const idSubject = this.selectedSubjectForDelete.id;
      this.http.delete(this.ROOT_URL + '/subject/' + idSubject, {observe: 'response'}).subscribe(response =>{
        if(response.status == 200) {
          this.selectedSubjectForDelete = null;
          this.getSubjects();
        }
      });
    }
  }

}
