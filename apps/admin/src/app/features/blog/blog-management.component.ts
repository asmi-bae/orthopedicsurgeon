import { ZrdCardComponent, ZrdButtonComponent, ZrdInputComponent, ZrdBadgeComponent } from '@ui/components';
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BLOGMANAGEMENTService } from '../../core/services/api/blogmanagement.service';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    ZrdCardComponent, 
    ZrdButtonComponent, 
    ZrdInputComponent,
    ZrdBadgeComponent,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 animate-in fade-in duration-500">

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold text-google-gray-900 dark:text-white tracking-tight">Editorial Hub</h1>
          <p class="text-google-gray-500 dark:text-google-gray-400 mt-1">Curate medical insights, patient success stories, and platform news.</p>
        </div>
        @if (!showEditor()) {
          <zrd-button variant="primary" size="md" (click)="openEditor()">
            <mat-icon leftIcon class="text-[20px]">add_circle</mat-icon>
            Draft Article
          </zrd-button>
        } @else {
          <button class="text-google-gray-500 hover:text-google-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 font-bold" (click)="closeEditor()">
            <mat-icon>arrow_back</mat-icon> Back to Hub
          </button>
        }
      </div>

      @if (loading()) {
        <div class="relative h-1 mb-6 overflow-hidden">
           <mat-progress-bar mode="query" color="primary" class="absolute inset-0"></mat-progress-bar>
        </div>
      }

      @if (!showEditor()) {
        <!-- Content Management Card -->
        <zrd-card variant="default">
          <!-- Control Strip -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <div class="flex-1 max-w-sm">
              <zrd-input 
                placeholder="Search articles by title or author..." 
                [hasPrefix]="true"
                (keyup)="applyFilter($event)"
              >
                <mat-icon prefix class="text-google-gray-400">search</mat-icon>
              </zrd-input>
            </div>
          </div>

          <!-- Spartan Editorial List -->
          <div class="space-y-4">
            @for (post of posts(); track post.id) {
              <div class="flex items-start gap-6 p-6 rounded-3xl hover:bg-google-gray-50 dark:hover:bg-white/5 transition-all group border border-google-gray-100 dark:border-white/5">
                <div class="w-14 h-14 rounded-2xl overflow-hidden bg-google-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  @if (post.coverImageUrl) {
                    <img [src]="post.coverImageUrl" class="w-full h-full object-cover">
                  } @else {
                    <mat-icon class="text-google-gray-400 text-[28px]">article</mat-icon>
                  }
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <h3 class="font-bold text-base text-google-gray-900 dark:text-white m-0 tracking-tight transition-colors group-hover:text-google-blue cursor-pointer" (click)="openEditor(post)">{{ post.title }}</h3>
                      <div class="flex items-center gap-x-2 text-[10px] font-black uppercase tracking-widest text-google-gray-400 mt-1">
                         <span>{{ post.authorName || 'Dr. Ab Rahman' }}</span>
                         <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                         <span>{{ (post.publishedAt || post.createdAt) | date:'mediumDate' }}</span>
                         @if (post.categoryName) {
                           <span class="w-1 h-1 rounded-full bg-google-gray-300"></span>
                           <span class="text-google-blue">#{{ post.categoryName }}</span>
                         }
                      </div>
                      <p class="text-sm text-google-gray-600 dark:text-google-gray-400 m-0 mt-3 line-clamp-2 leading-relaxed">{{ post.excerpt }}</p>
                    </div>
                    <div class="flex flex-col items-end gap-3 shrink-0">
                      <zrd-badge [variant]="getStatusVariant(post.status)" class="font-black">
                        {{ post.status }}
                      </zrd-badge>
                      <button [matMenuTriggerFor]="menu" class="p-2 h-9 w-9 flex items-center justify-center rounded-full hover:bg-google-gray-200 dark:hover:bg-white/10 text-google-gray-400 transition-all">
                        <mat-icon>more_vert</mat-icon>
                      </button>
                      <mat-menu #menu="matMenu" class="rounded-2xl border-none shadow-google">
                        <button mat-menu-item (click)="openEditor(post)">
                          <mat-icon class="text-google-blue">edit</mat-icon>
                          <span class="font-bold text-sm">Edit Article</span>
                        </button>
                        <button mat-menu-item (click)="publishPost(post)">
                          <mat-icon class="text-google-emerald">publish</mat-icon>
                          <span class="font-bold text-sm">Publish Now</span>
                        </button>
                        <div class="h-px bg-google-gray-100 dark:bg-white/5 my-1 mx-2"></div>
                        <button mat-menu-item class="text-google-red" (click)="deletePost(post.id)">
                          <mat-icon class="text-google-red">delete_sweep</mat-icon>
                          <span class="font-bold text-sm">Delete Article</span>
                        </button>
                      </mat-menu>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (posts().length === 0 && !loading()) {
            <div class="py-24 text-center">
              <div class="w-16 h-16 bg-google-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                 <mat-icon class="text-google-gray-400 text-3xl">auto_stories</mat-icon>
              </div>
              <h3 class="font-bold text-google-gray-900 dark:text-white">The Hub is Empty</h3>
              <p class="text-sm text-google-gray-500 mt-2">No articles or drafts found.</p>
            </div>
          }
        </zrd-card>
      } @else {
        <!-- Editor View -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-3">
            <zrd-card variant="default" class="p-8">
               <form [formGroup]="postForm" class="space-y-6">
                 
                 <!-- Cover Image -->
                 <div class="space-y-2">
                   <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1 flex justify-between">
                     Cover Image
                     @if (postForm.get('coverImageUrl')?.value) {
                        <button type="button" class="text-google-red hover:underline normal-case tracking-normal" (click)="postForm.get('coverImageUrl')?.setValue('')">Remove Image</button>
                     }
                   </label>
                   
                   <div class="relative w-full h-[240px] rounded-[24px] border-2 border-dashed border-google-gray-300 dark:border-white/10 hover:border-google-blue/50 transition-colors bg-google-gray-50 dark:bg-google-gray-900 overflow-hidden flex flex-col items-center justify-center group cursor-pointer"
                        (click)="fileInput.click()">
                     
                     <input #fileInput type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)">
                     
                     @if (postForm.get('coverImageUrl')?.value) {
                       <img [src]="postForm.get('coverImageUrl')?.value" class="w-full h-full object-cover absolute z-0 inset-0">
                       <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                         <div class="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                           <mat-icon>upload</mat-icon> Replace Cover
                         </div>
                       </div>
                     } @else {
                       <div class="w-14 h-14 rounded-full bg-google-gray-200 dark:bg-white/5 flex items-center justify-center mb-3">
                         <mat-icon class="text-google-gray-500 dark:text-google-gray-400 text-3xl">add_photo_alternate</mat-icon>
                       </div>
                       <span class="text-sm font-medium text-google-gray-700 dark:text-google-gray-300">Upload High-Res Cover</span>
                     }
                   </div>
                 </div>

                 <div class="space-y-2 pt-4">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Article Title</label>
                    <input type="text" formControlName="title" placeholder="Give it a catchy, SEO-friendly title..." 
                           class="w-full h-[60px] px-6 rounded-full bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue text-xl font-bold text-google-gray-900 dark:text-white outline-none">
                 </div>

                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Excerpt (Short Summary)</label>
                    <textarea formControlName="excerpt" 
                       class="w-full h-24 px-6 py-4 rounded-[20px] bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-none font-medium text-google-gray-900 dark:text-white outline-none"
                       placeholder="A 2-3 sentence summary that appears on the blog index..."
                    ></textarea>
                 </div>

                 <div class="space-y-2">
                    <div class="flex items-center justify-between mb-2">
                       <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Post Content</label>
                       <!-- Editor Toolbar Placeholder -->
                       <div class="flex items-center gap-1 text-google-gray-400 bg-google-gray-50 dark:bg-white/5 p-1 rounded-lg">
                          <button type="button" class="w-8 h-8 rounded hover:bg-google-gray-200 dark:hover:bg-white/10 flex items-center justify-center"><mat-icon class="text-[18px]">format_bold</mat-icon></button>
                          <button type="button" class="w-8 h-8 rounded hover:bg-google-gray-200 dark:hover:bg-white/10 flex items-center justify-center"><mat-icon class="text-[18px]">format_italic</mat-icon></button>
                          <button type="button" class="w-8 h-8 rounded hover:bg-google-gray-200 dark:hover:bg-white/10 flex items-center justify-center"><mat-icon class="text-[18px]">link</mat-icon></button>
                          <div class="w-px h-6 bg-google-gray-200 dark:bg-white/10 mx-1"></div>
                          <button type="button" class="w-8 h-8 rounded hover:bg-google-gray-200 dark:hover:bg-white/10 flex items-center justify-center"><mat-icon class="text-[18px]">format_list_bulleted</mat-icon></button>
                       </div>
                    </div>
                    <textarea formControlName="content"
                       class="w-full h-80 px-6 py-5 rounded-[24px] bg-transparent border border-google-gray-300 dark:border-white/10 focus:border-google-blue focus:ring-1 focus:ring-google-blue transition-all resize-y font-medium text-google-gray-900 dark:text-white outline-none leading-relaxed"
                       placeholder="Write your article content here..."
                    ></textarea>
                 </div>
               </form>
            </zrd-card>
          </div>
          
          <div class="space-y-6">
            <zrd-card variant="default" class="p-6 sticky top-6">
               <h3 class="text-lg font-bold text-google-gray-900 dark:text-white mb-6">Publishing</h3>
               
               <form [formGroup]="postForm" class="space-y-6 mb-8">
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Category</label>
                    <select formControlName="categoryId" class="w-full h-12 px-4 rounded-xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 text-google-gray-900 dark:text-white outline-none focus:border-google-blue">
                      <option value="">Select Category</option>
                      @for (cat of categories(); track cat.id) {
                        <option [value]="cat.id">{{ cat.name }}</option>
                      }
                    </select>
                 </div>
                 
                 <div class="space-y-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Tags (Comma separated)</label>
                    <zrd-input placeholder="e.g. surgery, tips..." formControlName="tags"></zrd-input>
                 </div>
                 
                 <div class="space-y-2 pt-2">
                    <label class="text-xs font-black uppercase tracking-widest text-google-gray-500 ml-1">Status</label>
                    <select formControlName="status" class="w-full h-12 px-4 rounded-xl bg-google-gray-50 dark:bg-white/5 border border-google-gray-200 dark:border-white/10 text-google-gray-900 dark:text-white outline-none focus:border-google-blue">
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                 </div>
               </form>
               
               <button type="button" class="w-full bg-google-blue hover:bg-google-blue/90 text-white font-bold h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50" (click)="savePost()" [disabled]="saving() || postForm.invalid">
                   @if (saving()) { <mat-icon class="animate-spin text-sm mr-2 w-4 h-4 leading-4 flex-shrink-0">sync</mat-icon> }
                   {{ saving() ? 'Saving...' : 'Save Article' }}
               </button>
            </zrd-card>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class BlogManagementComponent implements OnInit {
  private blogService = inject(BLOGMANAGEMENTService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  posts = signal<any[]>([]);
  categories = signal<any[]>([]);
  loading = signal(false);
  saving = signal(false);
  
  showEditor = signal(false);
  editingId = signal<string | null>(null);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    excerpt: [''],
    content: ['', Validators.required],
    categoryId: [''],
    tags: [''],
    coverImageUrl: [''],
    status: ['DRAFT']
  });

  ngOnInit() {
    this.loadPosts();
    this.loadCategories();
  }

  loadPosts() {
    this.loading.set(true);
    this.blogService.getAdminBlogPosts().subscribe({
      next: (res: any) => {
        let content = res?.data?.content || res?.data || [];
        // Support direct array from API
        if (Array.isArray(res)) content = res;
        this.posts.set(content);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadCategories() {
    this.blogService.getAdminBlogCategories().subscribe({
      next: (res: any) => {
        const cats = res?.data?.content || res?.data || [];
        this.categories.set(Array.isArray(cats) ? cats : []);
      }
    });
  }

  openEditor(post?: any) {
    if (post) {
      this.editingId.set(post.id);
      this.postForm.patchValue({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        categoryId: post.categoryId || (post.category ? post.category.id : ''),
        tags: post.tags ? post.tags.join(', ') : '',
        coverImageUrl: post.coverImageUrl || '',
        status: post.status || 'DRAFT'
      });
    } else {
      this.editingId.set(null);
      this.postForm.reset({ status: 'DRAFT' });
    }
    this.showEditor.set(true);
  }

  closeEditor() {
    this.showEditor.set(false);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.postForm.patchValue({ coverImageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  savePost() {
    if (this.postForm.invalid) return;
    this.saving.set(true);
    
    // Parse tags back into array if backend requires it
    const formVals = { ...this.postForm.value };
    if (typeof formVals.tags === 'string') {
      formVals.tags = formVals.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t);
    }

    const id = this.editingId();
    const obs = id 
      ? this.blogService.putAdminBlogPostsId(id, formVals)
      : this.blogService.postAdminBlogPosts(formVals);

    obs.subscribe({
      next: () => {
        this.snackBar.open(id ? 'Article updated successfully.' : 'Draft created successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-emerald', 'text-white']
        });
        this.saving.set(false);
        this.closeEditor();
        this.loadPosts();
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Error saving article.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['bg-google-red', 'text-white']
        });
      }
    });
  }

  publishPost(post: any) {
    this.loading.set(true);
    if(post.status === 'PUBLISHED') {
      this.blogService.putAdminBlogPostsIdUnpublish(post.id, {}).subscribe({
        next: () => {
          this.snackBar.open('Article moved to Draft.', 'Close', { duration: 3000 });
          this.loadPosts();
        },
        error: () => this.loading.set(false)
      });
    } else {
      this.blogService.putAdminBlogPostsIdPublish(post.id, {}).subscribe({
        next: () => {
          this.snackBar.open('Article Published.', 'Close', { duration: 3000, panelClass: ['bg-google-emerald', 'text-white'] });
          this.loadPosts();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  deletePost(id: string) {
    if(confirm('Are you sure you want to delete this article?')) {
      this.loading.set(true);
      this.blogService.deleteAdminBlogPostsId(id).subscribe({
        next: () => {
          this.snackBar.open('Article deleted.', 'Close', { duration: 3000 });
          this.loadPosts();
        },
        error: () => this.loading.set(false)
      });
    }
  }

  applyFilter(event: Event) { }

  getStatusVariant(status: string): any {
    const s = status?.toUpperCase();
    if (s === 'PUBLISHED') return 'success';
    if (s === 'DRAFT') return 'warning';
    if (s === 'ARCHIVED') return 'neutral';
    return 'neutral';
  }
}


