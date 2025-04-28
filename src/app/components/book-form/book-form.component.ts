import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode: boolean = false;
  bookId: number | null = null;
  loading: boolean = false;
  submitError: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      year_published: ['', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = Number(id);
      this.loadBookData(this.bookId);
    }
  }

  loadBookData(id: number): void {
    this.loading = true;
    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          genre: book.genre,
          year_published: book.year_published
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading book data:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.bookForm.invalid) {
      return;
    }

    const bookData: Book = this.bookForm.value;
    this.loading = true;

    if (this.isEditMode && this.bookId) {
      this.bookService.updateBook(this.bookId, bookData).subscribe({
        next: () => {
          this.router.navigate(['/books', this.bookId]);
        },
        error: (err) => {
          this.submitError = 'Failed to update book. Please try again.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.bookService.createBook(bookData).subscribe({
        next: () => {
          this.router.navigate(['/books']);
        },
        error: (err) => {
          this.submitError = 'Failed to create book. Please try again.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  get formControls() {
    return this.bookForm.controls;
  }
}