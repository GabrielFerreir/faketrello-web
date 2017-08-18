import { browser, by, element } from 'protractor';

export class FakeTrelloPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
