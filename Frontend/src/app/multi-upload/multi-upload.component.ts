import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'multi-upload',
  templateUrl: './multi-upload.component.html',
  styleUrls: ['./multi-upload.component.css']
})
export class MultiUploadComponent implements OnInit {
  images$ = new BehaviorSubject<any[]>([])
  images: any[] = [];
  values: any[] = [];

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.images$.subscribe({
      next: (value) => {
        this.images = value
        console.log('Images init: ', this.images)
      },
      error: (err) => console.log('Subscribe error: ', err)
    });
  }

  removeValue(i: number) {
    this.values.splice(i, 1);
  }

  addValue() {
    this.values.push({ value: '' });
  }

  uploadImages() {
    const files: FileList = this.fileInput.nativeElement.files;
    const formdata = new FormData();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formdata.append("files", file);
    }

    this.http.post('http://localhost:3000/multi-upload', formdata).subscribe({
      next: (res: any) => {
        this.images$.next(res);
        console.log('Response on images upload: ', this.images);
      },
      error: (err) => console.log('Error while uploading images: ', err)
    })
  }

  choose(event: any, mainImage: HTMLImageElement) {
    let selectedImage: HTMLImageElement = event.target;
    mainImage.src = selectedImage.src;
    (<HTMLImageElement>document.querySelector('.product__image--active')).classList.remove('product__image--active');
    selectedImage.classList.add('product__image--active');
  }
}