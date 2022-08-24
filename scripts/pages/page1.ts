import Page1Design from 'generated/pages/page1';
import Label from '@smartface/native/ui/label';
import { Route, Router } from '@smartface/router';
import { styleableComponentMixin } from '@smartface/styling-context';
import { i18n } from '@smartface/i18n';
import {sc} from 'services/jsonplaceholder'
class StyleableLabel extends styleableComponentMixin(Label) {}

export default class Page1 extends Page1Design {
  private disposeables: (() => void)[] = [];
  lbl: StyleableLabel;
  data: []
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.lbl = new StyleableLabel();
    console.log('[page1] constructor');
  }

  setTexts() {
    this.btnNext.text = i18n.instance.t('nextPage');
    this.lbl.text = i18n.instance.t('runtimeLabel');
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    console.log('[page1] onShow');
    this.disposeables.push(
      this.btnNext.on('press', () => {
        this.router.push('page2', { message: i18n.instance.t('helloWorld') });
      })
    );
  }


async getAllPost()  {
    try{
        const response = await sc.request({
            url: `/posts`,
            method: 'GET',
            headers:{
            }
        })
        return response.data;
    }catch(err){
        console.log('ERRROR' ,err);
        throw err;
    }
}


// Crash'e sebep olan kod
async  fetchList() {
    const resp = await this.getAllPost();
    this.data = resp;
    console.log(this.data, 'data');
}
  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.setTexts();
    console.log('[page1] onLoad');
    this.headerBar.leftItemEnabled = false;
    this.addChild(this.lbl, 'page1lbl1unique', 'sf-label', (userProps: Record<string, any>) => {
      return { ...userProps };
    });
    this.fetchList();
  }

  onHide(): void {
    this.dispose();
  }

  dispose(): void {
    this.disposeables.forEach((item) => item());
  }
}
