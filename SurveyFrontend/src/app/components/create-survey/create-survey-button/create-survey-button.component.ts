import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateSurveyService } from '../create-survey.service';

@Component({
  selector: 'ac-create-survey-button',
  templateUrl: './create-survey-button.component.html',
  styleUrls: ['./create-survey-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSurveyButtonComponent {

  constructor(private createSurveyService: CreateSurveyService) { }

  openAddSurveyModal() {
    this.createSurveyService.setIsModalVisible(true);
  }
}
