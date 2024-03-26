import { Component } from '@angular/core';
import {
  faChartLine,
  faWheatAlt,
  faHotdog,
  faPiggyBank,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  public readonly dashBoardIcon = faChartLine;
  public readonly ingredientsIcon = faWheatAlt;
  public readonly hotDogsIcon = faHotdog;
  public readonly promotionsIcon = faPiggyBank;
  public readonly logoutIcon = faDoorOpen;
}
