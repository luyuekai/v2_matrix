

function Dynamic_Cloneable_ViewModel() {
    var self = this;

    self.TYPE_TABLE='TABLE';
    self.TYPE_CHART='CHART';

    self.type = self.TYPE_TABLE;

    self.vm = ko.observable();//ThinListViewModel
    self.dom = null;
    self.dom_id = null;

    self.clone_table = function(){

    }
}
