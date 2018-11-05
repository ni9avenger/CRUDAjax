<?php include "includes/header.php"; ?>

<div class="row">
<form role="form" id="pForm" method="POST">
    <legend>Product Details</legend>
    <input type="hidden" id="pId" name="id">
    <div class="form-group col-md-6">
        <label for="pName">Name</label>
        <input type="text" class="form-control" id="pName" name="name" placeholder="Name" required>
    </div>

    <div class="form-group col-md-6">
        <label for="pPrice">Price</label>
        <input type="text" class="form-control" id="pPrice" name="price" placeholder="Price" required>
    </div>

    <div class="form-group col-md-12">
        <label for="pDescription">Description</label>
        <textarea class="form-control" id="pDescription" name="description" placeholder="Description" rows="3" required></textarea>
    </div>

    <div class="form-group col-md-12 text-center">
        <button type="submit" class="btn btn-success" id="btnSubmit">Add</button><button type="reset" class="btn btn-primary" id="btnReset">Reset</button>
    </div>
</form>


</div>

<div class="row">
<legend>Products</legend>

<table class="table table-striped table-responsive">
    <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th width="150px">Actions</th>
        </tr>
    </thead>
    <tbody id="pData">
        
    </tbody>
</table>

</div>



<?php include "includes/footer.php"; ?>