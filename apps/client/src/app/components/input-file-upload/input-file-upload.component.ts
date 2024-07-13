import { CommonModule } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';
import { ValueAccessorDirective } from '../value-accessor.directive';

@Component({
  selector: 'app-input-file-upload',
  templateUrl: './input-file-upload.component.html',
  styleUrls: ['./input-file-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [ValueAccessorDirective],
})
export default class InputFileUploadComponent {
  value?: File | File[];
  @Input() accept: string[] = [];
  @Input() label?: string;
  @Input() maxLength?: number;
  @Input({ transform: booleanAttribute }) required = false;
  multiple = false;
  uploadingUrl?: string;
  uploadingUrls: string[] = [];
  constructor(
    public valueAccessor: ValueAccessorDirective<File | File[] | undefined>,
  ) {
    valueAccessor.value.subscribe((value) => {
      if (!value) return;
      this.value = value;

      if (this.isFileArray(value)) {
        this.multiple = true;
        this.setObjectUrls(value);
        return;
      }

      this.setObjectUrl(value);
    });
  }

  onChange(event: any) {
    if (!event.target) return;
    const files = event.target.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;

    if (this.isFileArray(this.value)) {
      this.value = Array.from([...this.value, ...files]);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    const file = files[0];
    this.value = file;
    this.setObjectUrl(file);
    if (!this.value) return;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  isActive = false;
  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    const files: FileList = event.dataTransfer.files;
    const isValidated = this.validate(files);
    if (!isValidated) return;
    if (this.isFileArray(this.value)) {
      this.isActive = false;
      this.value = Array.from(files);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    this.isActive = false;
    const file = files[0];
    if (!file) return;
    this.value = file;
    this.setObjectUrl(file);
    if (!this.value) return;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  remove(file: File, objectUrl: string) {
    URL.revokeObjectURL(objectUrl);

    if (this.isFileArray(this.value)) {
      this.value = this.value.filter((f) => f !== file);
      this.setObjectUrls(this.value);
      this.valueAccessor.valueChange(this.value);
      this.valueAccessor.touchedChange(true);
      return;
    }

    this.value = undefined;
    this.uploadingUrl = undefined;
    this.valueAccessor.valueChange(this.value);
    this.valueAccessor.touchedChange(true);
  }

  private setObjectUrl(file: File) {
    if (!file) {
      this.uploadingUrl = undefined;
      return;
    }
    this.uploadingUrl = URL.createObjectURL(file);
  }

  private setObjectUrls(files: File[]) {
    if (!files) {
      this.uploadingUrls = [];
      return;
    }
    this.uploadingUrls = files.map((file) => URL.createObjectURL(file));
  }

  onDragOver(ev: Event) {
    this.isActive = true;
    ev.preventDefault();
    ev.stopPropagation();
  }

  onDragLeave(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.isActive = false;
  }
  private validate(files: FileList | null) {
    if (this.isFileArray(this.value)) {
      if (
        this.maxLength &&
        files &&
        files.length + this.value.length > this.maxLength
      ) {
        alert(`최대 ${this.maxLength}개까지 업로드 가능합니다.`);
        return false;
      }
    }

    if (
      this.maxLength &&
      files &&
      files.length + (this.value ? 1 : 0) > this.maxLength
    ) {
      alert(`최대 ${this.maxLength}개까지 업로드 가능합니다.`);
      return false;
    }

    return true;
  }

  isFileArray(value?: File | File[]): value is File[] {
    return Array.isArray(value);
  }
  isFile(value?: File | File[]): value is File {
    return value instanceof File;
  }
}
