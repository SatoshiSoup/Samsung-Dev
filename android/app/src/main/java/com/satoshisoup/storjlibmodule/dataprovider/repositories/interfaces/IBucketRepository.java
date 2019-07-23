package com.satoshisoup.storjlibmodule.dataprovider.repositories.interfaces;

import com.satoshisoup.storjlibmodule.models.BucketModel;
import com.satoshisoup.storjlibmodule.responses.Response;

/**
 * Created by crawt on 3/4/2018.
 */

public interface IBucketRepository {
    Response insert(BucketModel model);
    Response delete(BucketModel model);
    Response delete(String bucketId);
    Response delete(String[] bucketIdList);
    Response update(BucketModel model);
    Response update(String bucketId, boolean isStarred);
}
