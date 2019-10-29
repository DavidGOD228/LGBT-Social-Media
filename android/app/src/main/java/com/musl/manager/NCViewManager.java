package com.musl.manager;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.view.ReactViewGroup;

/**
 * Created by talapbekov on 10/9/17.
 * Non Clipping ViewGroup
 * Adds ability to override default reactnative/android behaviour to clip
 * children that are out of current bounds
 */

public class NCViewManager extends ViewGroupManager<ReactViewGroup> {

    public static final String REACT_CLASS = "NCView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactViewGroup createViewInstance(ThemedReactContext reactContext) {
        return new ReactViewGroup(reactContext);
    }

    @ReactProp(name = "clipChildren")
    public void setClipChildren(ReactViewGroup view, boolean clipChildren) {
        view.setClipChildren(clipChildren);
    }

}
